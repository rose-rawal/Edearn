import React, { useContext, useEffect, useState } from "react";
import context from "../../../context/mainContext";
import axiosInstance from "../../../api/axiosInstance";
import kazu from "../../../assests/kazu.jpg";
import Layout from "../../Layout/layout";
import { useNavigate } from "react-router";

const UserHome = () => {
  // Section 1: Context and State
  const { user } = useContext(context);
  const [userDetail, setUserDetail] = useState({});
  const navigate = useNavigate();
  // Section 2: Initialization Function
  const init = async () => {
    try {
      const res = await axiosInstance.post(`/api/getUser`, {
        email: localStorage.getItem("currentUser"),
      });

      setUserDetail(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Section 3: useEffect for Initialization
  useEffect(() => {
    init();
  }, []);
  const handleClick = (e) => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Section 4: Render
  return (
    <Layout>
      <div className="flex w-full h-screen relative">
        {/* Section 5: Sidebar */}
        <div className="bg-gray-600 w-1/6 h-full flex flex-col items-center">
          <div className="rounded-full w-28 h-28 mt-16">
            <img
              src={kazu} // Replace with the actual path to your image
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-16 gap-8 text-white">
            <div>Home</div>
            <div>Stats</div>
            <div>Setting</div>
          </div>
        </div>
        <div
          onClick={handleClick}
          className="absolute top-0 right-10 text-white bg-red-600 px-3 py-2 rounded-2xl font-bold hover:scale-110 transition-all"
        >
          Log Out{" "}
        </div>
        {/* Section 6: Main Content */}
        <div className="bg-black w-5/6 h-full flex flex-col">
          {/* Section 7: User Info */}
          <div className="w-1/2  h-screen">
            <div className="w-1/2  h-20 rounded-md m-16 ">
              <h1 className="flex justify-center pt-6 text-3xl text-white">
                User Info
              </h1>

              {/* Section 8: User Info Details */}
              <div className="bg-gray-700 bg-opacity-50 mt-16 mb-4 rounded-3xl pb-5 text-base text-white">
                <div className="flex pl-6  pt-6">Name: {userDetail.name}</div>
                <div className="flex pl-6 pt-6">Email: {userDetail.email}</div>
                <div className="flex pl-6 pt-6">Win: {userDetail.win}</div>
              </div>

              {/* Section 9: Catch It Game */}
              <h1 className="flex justify-center pt-6 text-3xl text-white">
                Catch It
              </h1>
              <div className="bg-gray-700 bg-opacity-50 mt-16 rounded-3xl pb-5 text-base text-white">
                <div className="flex pl-6 pt-6">Win: {userDetail.win}</div>
                <div className="flex pl-6 pt-6">
                  Points Earned: {userDetail.pointsEarned}
                </div>
                <div className="flex pl-6  pt-6">
                  Question Solved: {userDetail.questionSolved}
                </div>
              </div>
            </div>
          </div>

          {/* Section 10: Points Section */}
          <div className="absolute top-0 right-0 m-24 text-white flex flex-col pr-24">
            <p
              className="text-3xl pl-7
        "
            >
              Points
            </p>
            <p className="text-9xl mt-4 text-blue-400">{userDetail.points}</p>
          </div>

          {/* Section 11: Anagram Game */}
          <div className=" w-full h-screen flex justify-end">
            <div className=" w-1/2">
              <h1 className="flex justify-center pt-6 text-3xl text-white">
                Anagram
              </h1>
              <div className="bg-gray-700 w-1/2 ml-40 bg-opacity-50 mt-16 rounded-3xl pb-5 text-base text-white">
                <div className="flex pl-6 pt-6">Win: {userDetail.winAna}</div>
                <div className="flex pl-6  pt-6">
                  Points Earned: {userDetail.pointsEarnedAna}
                </div>
                <div className="flex pl-6 pt-6">
                  Points Spent: {userDetail.pointsSpentAna}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserHome;
