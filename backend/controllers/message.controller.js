import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getRecieverSocketId, io } from "../socket/socket.js"

// export const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body
//         const { id: recieverId } = req.params
//         const senderId = req.user?._id

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, recieverId] }
//         })

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, recieverId]
//             })
//         }

//         const newMessage = new Message({
//             senderId,
//             recieverId,
//             message
//         })

//         if (newMessage) {
//             conversation.messages.push(newMessage?._id)
//         }


//         // this will run parallel
//         await Promise.all([conversation.save(), newMessage.save()])

//         //Socket io will come here..
//         const recieverSocketId = getRecieverSocketId(recieverId)
//         if (recieverSocketId) {

//             // this message is used to send events to specific clients
//             io.to(recieverSocketId)?.emit('newMessage', newMessage)
//         }

//         res.status(201).json(newMessage)
//     } catch (error) {
//         console.log('error in sending message', error.message)
//         res.status(500).json({ error: 'Internal server error' })
//     }
// }

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;
        let conversation = await Conversation.findOne({
            "participants.user": { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [{ user: senderId }, { user: receiverId }]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage?._id);
        }


        // Update unread count for the receiver
        const receiverParticipant = conversation.participants.find(participant => String(participant.user) === receiverId);
        if (receiverParticipant) {
            receiverParticipant.unreadCount += 1;
        }

        // this will run parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //Socket io will come here..
        const receiverSocketId = await getRecieverSocketId(receiverId);
        

        if (receiverSocketId) {
            const messageToReciever={
                senderId,
                receiverId,
                message,
                conversationId:conversation?._id
            }
            // this message is used to send events to specific clients
            io.to(receiverSocketId)?.emit('newMessage', messageToReciever);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log('error in sending message', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Messages
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user?._id


        const conversation = await Conversation.findOne({
            "participants.user": { $all: [senderId, userToChatId] }
        }).populate('messages');


        if (!conversation) {
            return res.status(200).json([])
        }

        // Update unread count for the sender to 0
        const participantIndex = conversation.participants.findIndex(participant => participant.user.equals(senderId));

        if (participantIndex !== -1) {
            conversation.participants[participantIndex].unreadCount = 0;
        }

        // Save the updated conversation
        await conversation.save()

        const messages = conversation?.messages
        res.status(200).json(messages)
    } catch (error) {
        console.log('error in getting message', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}