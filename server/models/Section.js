import mongoose from "mongoose";

export default mongoose.model("Section", mongoose.Schema({
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },
    title: {
        type: String,
        default: ''
    }
}))