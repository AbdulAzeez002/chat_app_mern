import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }, unreadCount: { type: Number, default: 0 }
  }

  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: []
    }
  ],

}, { timestamps: true })

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation;