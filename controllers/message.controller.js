import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";

//for chatting
export const sentMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const message = req.body;

        let coversation = await Conversation.findOne({
            partcipants: { $all: [senderId, receiverId] }

        })
        // establish the conversation if not started yet.
        if (!coversation) {
            coversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }
        // add the message to the conversation
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })
        if (newMessage) coversation.messages.push(newMessage._id)
        await Promise.all([coversation.save(), newMessage.save()])

        //implement socketio realtime data transfer
        return res.status(200).json({
            success: true,
            newMessage
        })
    } catch (error) {
        console.log(error)
    }
}

export const getMessage = async(req ,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');
        if(!conversation) return res.status(200).json({success:true, messages:[]});
        return res.status(200).json({success:true, messages:conversation?.messages})
    } catch (error) {
        console.log(error)
    }
}