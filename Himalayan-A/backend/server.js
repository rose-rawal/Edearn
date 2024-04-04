import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import paymentRouter from "./routes/paymentroute.js";
import mongoose from "mongoose";
import { Server } from "socket.io";
import gameRouter from "./routes/gameRoute.js";

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use("/api", router);
app.use("/", paymentRouter);
app.use("/game", gameRouter);
const server = app.listen(9000, () => {
  console.log("listening at 9000");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/edearn")
  .then(() => {
    console.log("DB connection successfully");
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let a = 0;

let dataaa = [];
io.on("connection", (socket) => {
  console.log("User Connected");
  a = a + 1;

  socket.on("joinRoom", (data) => {
    console.log("No of users Joined", a);
    socket.join(data.room);
    console.log(`User ${data.user} joined in room ${data.room}`);

    socket.on("points", (data) => {
      //boradcast to all room except for yourself;
      console.log("data result", data.result);
      // dataaa = [...dataaa, data.result];
      io.to(data.room).emit("points2", {
        numberOfUsers: a,
        result: data.result,
      });
      // socket.to(data.room).emit("points2", {
      //   numberOfUsers: a,
      //   result: data.result,
      // });
    });
  });

  // socket.on("catchIt", (data) => {
  //   console.log("No of users Joined", a);

  //   socket.join(data.room);
  //   console.log(`User ${data.user} joined in room ${data.room}`);

  //   socket.on("level", (data) => {
  //     console.log("data result", data.result);
  //     io.to(data.room).emit("level2", {
  //       numberOfUsers: a,
  //       result: data.result,
  //     });
  //   });
  // });

  socket.on("disconnect", () => {
    a = a - 1;
    console.log("Users left", a);

    console.log("User Disconnected");
  });
});
