import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required"]
  }
},{timestamps: true})

const BlackList = mongoose.model("BlackList", blackListSchema)
export default BlackList