import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Username must be unique"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }
}, {
  timestamps: true
});

const User =  mongoose.model("User", userSchema);
export default User  