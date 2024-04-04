import { Router } from "express";
import axios from "axios";
import request from "request";
import userSchema from "../model/userSchema.js";
const paymentRouter = Router();

const payKhalti = async (req, res) => {
  const { pack, email } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    //user details generated here

    var options = {
      method: "POST",
      url: "https://a.khalti.com/api/v2/epayment/initiate/",
      headers: {
        Authorization: "key 6b076707efa84413bd088646701ba5c4",
        "Content-Type": "application/json",
      },

      //putting required data is remaining

      body: JSON.stringify({
        return_url: "http://localhost:3000/payment/confirm",
        website_url: "http://localhost:300",
        amount: pack.price * 100,
        purchase_order_id: "Order01",
        purchase_order_name: pack.name,
        customer_info: {
          name: user.name,
          email: email,
          phone: "9800000001",
        },
      }),
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      const responseData = JSON.parse(response.body);
      if (responseData.pidx) {
        console.log("success ");
      } else {
        console.log("fail");
      }
      return res.json(responseData);
    });
  } catch (err) {
    console.log("error :", err);
  }
};
paymentRouter.post("/payment", payKhalti);

const valueUpdate = async (req, res) => {
  const { point, email } = req.body;
  console.log(point, "points");
  console.log(req.body);
  const usera = await userSchema.findOneAndUpdate(
    { email: JSON.parse(email) },
    { $inc: { points: point } }
  );
  if (!usera) {
    return res.status(400).json("User not found");
  }

  return res.json("send");
};
paymentRouter.post("/valueUpdate", valueUpdate);

export default paymentRouter;
