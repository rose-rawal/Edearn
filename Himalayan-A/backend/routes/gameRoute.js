import { Router } from "express";
import userSchema from "../model/userSchema.js";

const gameRouter = Router();

const anagramScoring = async (req, res) => {
  const { email, success } = req.body;
  console.log(req.body, "req body");
  try {
    const user = await userSchema.findOne({ email: JSON.parse(email) }).exec();
    if (!user) {
      return res.json("user not Found");
    }
    if (success) {
      console.log(user);
      user.winAna += 1;
      user.pointsSpentAna += 5;
      user.pointsEarnedAna += 8;

      await user.save();
      return res.json(user);
    }
    return res.json("not found");
  } catch (err) {
    console.log("Error while posting anagram score", err);
  }
};
gameRouter.post("/anagramScore", anagramScoring);

const catchScoring = async (req, res) => {
  const { email, success } = req.body;
  console.log(req.body, "req body");
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.json("user not Found");
    }
    if (success) {
      console.log(user);
      user.win += 1;
      user.pointsSpent += 5;
      user.pointsEarned += 8;

      await user.save();
      return res.json(user);
    }
    if (!success) {
      console.log(user);
      user.pointsSpent += 5;

      await user.save();
      return res.json(user);
    }
    return res.json("Data Error");
  } catch (err) {
    console.log("Error while posting catchPlay score", err);
  }
};
gameRouter.post("/catchScore", catchScoring);

export default gameRouter;
