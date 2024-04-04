import { Router } from "express";
import userSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/hello", (req, res) => {
  return res.json("dance");
});

router.post("/createUser", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const emailCheck = await userSchema.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email Already Userd", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userSchema.create({
      email,
      password: hashedPassword,
      name,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    console.log("Error while creating a user", err);
  }
});

router.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.json({ msg: "Incorrect Email", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Password", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    console.log("Error while logging In", err);
  }
});

router.post("/getUser", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const response = await userSchema.findOne({ email: JSON.parse(email) });

    if (response) {
      // delete response.password;
      const { password, ...userWithoutPassword } = response.toObject();
      return res.json(userWithoutPassword);
    }
  } catch (err) {
    console.log(err);
  }
  return res.json(req.body);
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const response = await userSchema.find();

    if (response) {
      return res.json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
