import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        require:true
    }
})

export default commentSchema = mongoose.model('Comment',commentSchema); 