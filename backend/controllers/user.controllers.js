import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")

        // for getting only chatted users
        const conversations = await Conversation.find({ 'participants': loggedInUser }).populate('participants').populate('messages').sort({ updatedAt: -1 })

        // const users = conversations.reduce((acc, conv) => {
        //     conv.participants.forEach(participant => {
        //         console.log((participant._id).toString() === loggedInUser.toString(), 'ids')
        //         if ((participant._id).toString() !== loggedInUser.toString()) {
        //             // Exclude the user themselves from the list
        //             acc.push(participant);
        //         }
        //     });
        //     return acc;
        // }, []);
        // res.status(200).json(users)


        res.status(200).json(filteredUsers)
        // res.status(200).json(conversations)


    } catch (error) {
        console.log('error in getting users', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}


export const userSearch = async (req, res) => {
    const loggedInUser = req.user._id;
    const term = req.params.term;

    try {
        let query = { _id: { $ne: loggedInUser } }; // Query to exclude the logged-in user

        if (term) {
            // If search term is provided, add it to the query
            query.fullName = { $regex: term, $options: 'i' };
        }

        let users;
        if (term) {
            users = await User.find(query).select('-password');
        } else {
            // If search term is empty, fetch 10 users
            users = await User.find(query).limit(10).select('-password');
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};