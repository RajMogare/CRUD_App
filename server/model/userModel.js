import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  phoneNumber: { // Added phoneNumber field
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  hobbies: [String], // Added hobbies field as an array of strings
  // Removed lastName and password fields
});

export default mongoose.model("User", userSchema);
