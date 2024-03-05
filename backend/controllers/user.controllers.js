import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js"

// export const getUsersForSidebar = async (req, res) => {
//     try {

//         const loggedInUser = req.user._id
        
//         // const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")

//         // for getting only chatted users
//         const conversations = await Conversation.find({ 'participants.user': loggedInUser }).populate('participants.user').populate('messages').sort({ updatedAt: -1 })
//     //    console.log(conversations,'b')
        
//     const users = conversations.reduce((acc, conv) => {
//         conv.participants.forEach(participant => {
//             const me = conv.participants.find(p => p.user._id.toString() === loggedInUser.toString());
//             const unreadCount = me?.unreadCount;
//             const unseenCount = 7
    
//             if ((participant.user?._id).toString() !== loggedInUser.toString()) {
//                 participant.unreadCount = unreadCount;
//                 participant.unseenCount = unseenCount;
//                 // Exclude the user themselves from the list
//                 acc.push(participant);
//             }
//         });
//         return acc;
//     }, []);
  
        
//         res.status(200).json(users)


//         // res.status(200).json(filteredUsers)
//         // res.status(200).json(newConv)


//     } catch (error) {
//         console.log('error in getting users', error.message)
//         res.status(500).json({ error: 'Internal server error' })
//     }
// }

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id

        const conversations = await Conversation.find({ 'participants.user': loggedInUser }).populate('participants.user').populate('messages').sort({ updatedAt: -1 })

        const users = conversations.reduce((acc, conv) => {
            conv.participants.forEach(participant => {
                const me = conv.participants.find(p => p.user._id.toString() === loggedInUser.toString());
                const unreadCount = me?.unreadCount;
                const unseenCount = 7; // This is just a placeholder value, replace it with the actual logic to calculate unseen count
                
                if ((participant.user?._id).toString() !== loggedInUser.toString()) {
                    
                    participant.unreadCount = unreadCount;
                    // participant.unseenCount = unseenCount;
                    acc.push(participant);
                }
            });
            return acc;
        }, []);

        console.log(users,'users')

        res.status(200).json(users)
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

export const getUserDetails=async(req,res)=>{
   const id=req.params.id
   try {
    const user=await User.findById(id)?.select('-password')
    if(user){
        res.status(200).json(user)
    }else{
        res.status(400).json({error:'No such user found'})
    }
   } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
   }
}