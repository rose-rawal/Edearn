import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import context from "./mainContext";
import { loginInUserApi, signUpUserApi, subscriptionApi } from "../api/user";

const Context = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const newSocket = () => {
    return io("http://localhost:9000");
  };

  const [user, setUser] = useState({
    email: "",
  });
  const [loggedIn, setLoggedIn] = useState();
  const [toggleSignPage, setToggleSignPage] = useState(true);
  const [onChangeLoginData, setOnChangeLoginData] = useState({
    email: "",
    password: "",
  });

  const [onChangeSignInData, setOnChangeSignInData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const init = () => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      setUser({ email: JSON.parse(userString) });
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    init();
  }, []);
  const loginUser = async ({ email, password }) => {
    try {
      const userResp = await loginInUserApi({ email, password });
      console.log("Context login userdata", userResp);

      setUser({ email: email });
      localStorage.setItem("currentUser", JSON.stringify(email));
      setLoggedIn(true);
      if (userResp.status)
        return {
          success: true,
        };
      else
        return {
          success: false,
        };
    } catch (err) {
      console.log("Error in context Login Api", err);
    }
  };

  const signInUser = async ({ email, password, name }) => {
    try {
      const userResp = await signUpUserApi({ email, password, name });
      console.log("Context login userdata", userResp);

      if (userResp.status)
        return {
          success: true,
        };
      else
        return {
          success: false,
        };
    } catch (err) {
      console.log("Error in context SigIn", err);
    }
  };

  const paymentDo = async (pack) => {
    try {
      const paymentSuccess = await subscriptionApi({
        pack,
        email: user.email,
      });
      console.log("payment Details", paymentSuccess);
    } catch (err) {
      console.log("error in payment", err);
    }
  };
  return (
    <context.Provider
      value={{
        newSocket,
        socket,
        setSocket,
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        loginUser,
        signInUser,
        setOnChangeLoginData,
        onChangeLoginData,
        setOnChangeSignInData,
        onChangeSignInData,
        toggleSignPage,
        setToggleSignPage,
        paymentDo,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Context;
