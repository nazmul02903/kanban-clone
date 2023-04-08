import mongoose from "mongoose";

const Section =  mongoose.model("Section", mongoose.Schema({
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },
    title: {
        type: String,
        default: 'UNtitled'
    }
}))

export default Section