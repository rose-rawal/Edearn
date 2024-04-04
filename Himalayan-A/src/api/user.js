import axiosInstance from "./axiosInstance";

export const signUpUserApi = async ({ email, password, name }) => {
  const res = await axiosInstance.post("/api/createUser", {
    email,
    password,
    name,
  });
  console.log(res.data.status);

  return res.data;
};

export const loginInUserApi = async ({ email, password }) => {
  const res = await axiosInstance.post("/api/loginUser", {
    email,
    password,
  });
  console.log(res.data.status);
  return res.data;
};

export const subscriptionApi = async ({ pack, email }) => {
  const res = await axiosInstance.post(`/payment`, { pack, email });
  if (res.data.pidx) {
    console.log(res.data.pidx);
    window.location.href = res.data.payment_url;
  }
  return res.data;
  //   console.log(pack, email);
  //   return 0;
};

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/api/getAllUsers");
  console.log(res.data[0].name);
  return res.data;
};

export const catchScore = async ({ email, success }) => {
  const res = await axiosInstance.post("/game/catchScore", {
    email,
    success,
  });
  console.log(res.data.status);

  return res.data;
};
