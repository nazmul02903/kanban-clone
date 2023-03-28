import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  mongoose.Schema({
    username: {
      type: String,
      min:[4, "Username should be at least 4 character"],
      unique: true,
    },
    password: {
      type: String,
      min:[6, "Password should be at least 6 character"]
    },
  })
);

export default User;
