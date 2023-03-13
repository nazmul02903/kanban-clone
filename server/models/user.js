import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      tyep: String,
      required: true,
      select: false,
    },
  })
);

export default User;
