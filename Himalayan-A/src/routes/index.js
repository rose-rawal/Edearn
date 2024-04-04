import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Login from "../pages/Login";
import Game from "../pages/Game";
import Dictionary from "../pages/dictionary";

import Competition from "../pages/Competition";
import PaymentConfirm from "../pages/component/PaymentConfirm";

import Anagram from "../games/Anagram";
import DashBoard from "../pages/dashboard/Dashboard";

import Learn from "../pages/Layout/Learn";

import Setting from "../pages/dashboard/admin/Setting";
import UserHome from "../pages/dashboard/admin/UserHome";
import OnlineGame from "../pages/onlineGame";
import OfflineGame from "../pages/OfflineGame";
import OffAnagram from "../games/OffAnagram";
import OffGame from "../games/OffGame";

export const routes = [
  {
    name: "Home",
    element: <Home />,
    path: "/",
  },
  {
    name: "Payment",
    element: <Payment />,
    path: "/payment",
  },

  {
    name: "Login",
    element: <Login />,
    path: "/login",
  },
  {
    name: "Game",
    element: <Game />,
    path: "/online/catchPlay",
  },
  {
    name: "Dictionary",
    element: <Dictionary />,
    path: "/dictionary",
  },
  {
    name: "Competition",
    element: <Competition />,
    path: "/competition",
  },
  {
    name: "Payment Confirm",
    element: <PaymentConfirm />,
    path: "/payment/confirm",
  },
  {
    name: "Anagram",
    element: <Anagram />,
    path: "/online/anagram",
  },

  {
    name: "Setting",
    element: <Setting />,
    path: "/user/setting",
  },
  {
    name: "UserHome",
    element: <UserHome />,
    path: "/dashboard",
  },
  {
    name: "Learn",
    element: <Learn />,
    path: "/learn",
  },
  {
    name: "OnlineGame",
    element: <OnlineGame />,
    path: "/online",
  },
  {
    name: "OfflineGame",
    element: <OfflineGame />,
    path: "/offline",
  },

  {
    element: <DashBoard />,
    path: "/dashboard",
  },
  {
    name: "OfflineAnagram",
    element: <OffAnagram />,
    path: "/offline/anagram",
  },
  {
    name: "OfflineCatchPlay",
    element: <OffGame />,
    path: "/offline/catchPlay",
  },
];
