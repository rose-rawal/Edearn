import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 30,
  },
  questionSolved: {
    type: Number,
    default: 0,
  },
  win: {
    type: Number,
    default: 0,
  },
  pointsSpent: {
    type: Number,
    default: 0,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
  winAna: {
    type: Number,
    default: 0,
  },
  pointsSpentAna: {
    type: Number,
    default: 0,
  },
  pointsEarnedAna: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Users", userSchema);
