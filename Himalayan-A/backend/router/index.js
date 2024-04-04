import { Router } from "express";
const router = Router();
const hello = (req, res) => {
  return res.status(400).json("hello world");
};
router.get("/hello", hello);
export default router;
