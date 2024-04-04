import NavigationBar from "./Layout/header";
import Layout from "./Layout/layout";
import Home from "./Home";
import DarkHome from "./homeTheme/DarkHome";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import context from "../context/mainContext";

const Login = () => {
  const {
    user,
    setLoggedIn,
    loggedIn,
    loginUser,
    signInUser,
    setOnChangeLoginData,
    onChangeLoginData,
    setOnChangeSignInData,
    onChangeSignInData,
    toggleSignPage,
    setToggleSignPage,
  } = useContext(context);

  const navigate = useNavigate();
  const handleChangeLogin = (e) => {
    setOnChangeLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(onChangeLoginData);
  };
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, []);
  const handleChangeSigIn = (e) => {
    setOnChangeSignInData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(onChangeLoginData);
  };
  const handleSubmit = async (e, page) => {
    e.preventDefault();
    if (page === "Login") {
      const resp = await loginUser(onChangeLoginData);
      console.log("Logged IN resp login page", resp);
      if (resp.success) {
        navigate("/offline");
        console.log("user data", user);
      }
    } else {
      const resp = await signInUser(onChangeSignInData);
      console.log("Logged IN resp login page", resp);
      if (resp.success) {
        setToggleSignPage((prev) => !prev);
        console.log("user data", user);
      }
    }
  };
  return (
    <Layout>
      <div className="relative h-screen overflow-hidden">
        <DarkHome />
        <div>
          <div class="h-screen flex items-center justify-center">
            <div class=" p-8 rounded shadow-md w-1/2 h-3/5">
              <div>
                <div>
                  {toggleSignPage ? (
                    <div className="bg-black p-12 ">
                      <form onSubmit={(event) => handleSubmit(event, "Login")}>
                        <div className="mb-4">
                          <h1 className="text-xl font-semibold mb-8 text-center">
                            Login
                          </h1>
                        </div>
                        <label
                          for="username"
                          className="block text-sm font-medium text-gray-400"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          placeholder="Email"
                          name="email"
                          required
                          className="mt-1 p-2 w-full border rounded-md bg-gray-800 "
                          onChange={(e) => {
                            handleChangeLogin(e);
                          }}
                          min="3"
                        />
                        <label
                          for="password"
                          className="block text-sm font-medium text-gray-400 mt-5"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="Password"
                          className="mt-1 p-2 w-full border rounded-md bg-gray-800 "
                          name="password"
                          onChange={(e) => {
                            handleChangeLogin(e);
                          }}
                          min="8"
                        />

                        <button
                          type="submit"
                          className="w-full text-white mt-8"
                        >
                          <div className=" container mx-auto bg-blue-500 p-2 hover:bg-blue-600 rounded-md">
                            Login
                          </div>
                        </button>
                      </form>
                      <h1
                        className="text-center mt-5 text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setToggleSignPage((prev) => !prev);
                        }}
                      >
                        Don't Have an Account Sign Here
                      </h1>
                    </div>
                  ) : (
                    <div className="bg-black p-12 ">
                      <form onSubmit={(event) => handleSubmit(event, "SignUp")}>
                        <div className="mb-4">
                          <h1 className="text-xl font-semibold mb-8 text-center">
                            Register Here
                          </h1>
                        </div>
                        <label
                          for="username"
                          className="block text-sm font-medium text-gray-400"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          placeholder="Email"
                          required
                          name="email"
                          className="mt-1 p-2 w-full border rounded-md bg-gray-800 "
                          onChange={(e) => {
                            handleChangeSigIn(e);
                          }}
                          min="3"
                        />
                        <label
                          for="password"
                          className="block text-sm font-medium text-gray-400 mt-5"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="Password"
                          className="mt-1 p-2 w-full border rounded-md bg-gray-800 "
                          name="password"
                          onChange={(e) => {
                            handleChangeSigIn(e);
                          }}
                          min="8"
                        />
                        <label
                          for="name"
                          className="block text-sm font-medium text-gray-400 mt-5"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Name"
                          className="mt-1 p-2 w-full border rounded-md bg-gray-800 "
                          name="name"
                          onChange={(e) => {
                            handleChangeSigIn(e);
                          }}
                          min="8"
                        />

                        <button
                          type="submit"
                          className="w-full text-white mt-8"
                        >
                          <div className=" container mx-auto bg-blue-500 p-2 hover:bg-blue-600 rounded-md">
                            Sign Up
                          </div>
                        </button>
                      </form>
                      <h1
                        className="text-center mt-5 text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setToggleSignPage((prev) => !prev);
                        }}
                      >
                        Already have an account ? Login Here !
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
