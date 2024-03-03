import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken.js"



export const singupUser = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "passwords do not match" })
        }

        const user = await User.findOne({ userName })
        if (user) {
            return res.status(400).json({ error: "userName already exists" })
        }


        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,


        })

        if (newUser) {
            // generateTokenAndSetCookie(newUser._id, res)
            const token = await generateToken(newUser?._id)
            await newUser.save()

            const user = {
                _id: newUser?._id,
                fullName,
                profilePic: newUser?.profilePic,
                userName: userName,
                token: token

            }

            res.status(201).json(user)
        } else {
            res.status(400).json({ error: "Invalid user data" })
        }

    } catch (error) {
        console.log('error in signup terminal', error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName })
        const isPasswordMatching = await bcrypt.compare(password, user?.password || '')
        if (!user || !isPasswordMatching) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }

        const token = await generateToken(user?._id)

        res.status(200).json({
            _id: user?._id,
            fullName: user?.fullName,
            profilePic: user?.profilePic,
            userName: user?.userName,
            token: token
        })

    } catch (error) {
        console.log('error in login terminal', error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged  out succesfully" })
    } catch (error) {
        console.log('error in logout terminal', error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}