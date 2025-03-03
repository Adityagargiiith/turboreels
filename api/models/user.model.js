import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    credits: {
      type: Number,
      default: 0,
    },
    signInBonus: {
      type: Boolean,
      default: false,
    },
    activePlan: {
      type: String,
      default: "Free",
    },
    youtube: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    }
    

  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema);


export default User;