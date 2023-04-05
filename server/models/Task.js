import mongoose from "mongoose";

export default mongoose.model("Task", mongoose.Schema({
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