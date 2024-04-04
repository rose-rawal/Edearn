import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import context from "../../context/mainContext";
import { useLocation } from "react-router";
import axiosInstance from "../../api/axiosInstance";
const PaymentConfirm = () => {
  const { user } = useContext(context);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const status = queryParams.get("status");
  const amount = queryParams.get("amount");
  const [totalPointsInc, setTotalPointsInc] = useState(0);
  console.log("status", status, amount);

  const valueUpdate = async () => {
    let point = 0;
    if (status === "Completed") {
      if (amount == 40000) point = 100;
      else if (amount == 60000) point = 160;
      else if (amount == 80000) point = 200;
    }
    try {
      const updated = await axiosInstance.post("/valueUpdate", {
        point,
        email: localStorage.getItem("currentUser"),
      });
      console.log(updated);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    valueUpdate();
  }, []);
  return <div>PaymentConfirm</div>;
};

export default PaymentConfirm;
