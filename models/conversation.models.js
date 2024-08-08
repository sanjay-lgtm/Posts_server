import mongoose, { mongo } from "mongoose";

const conversationSchema = new mongoose.Schema({
    partcipants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});

export default Conversation = mongoose.model('Conversation', conversationSchema);