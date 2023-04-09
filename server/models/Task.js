import mongoose from "mongoose";

const Task =  mongoose.model("Task", mongoose.Schema({
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    position: {
        type: Number
    }
}))

export default Task