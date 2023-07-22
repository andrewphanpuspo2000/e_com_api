import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const Port = process.env.PORT || 8000;
//middleware
app.use(cors());
app.use(morgan());
app.use(express.json());
//database connection
import mongoConnect from "./src/config/mongoConfig.js";
mongoConnect();
//router API
import userRouter from "./src/router/userRouter.js";
import { BuildCLIProgramNotFoundException } from "ionic/lib/errors.js";
app.use("/api/v1/user", userRouter);

//api default
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is running",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const code = error.statusCode || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});

app.listen(Port, (err) => {
  err
    ? console.log(err.message)
    : console.log(`server is running at port ${Port}`);
});
