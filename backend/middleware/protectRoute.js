import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization?.startsWith('Bearer')) {
        try {

            // get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token

            req.user = await User.findById(decoded?.userId).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    if (!token) {
        return res.status(401).json({ error: "Unauthorized - no token provided" })
    }
}

export default protectRoute;