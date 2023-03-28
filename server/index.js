import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import registerRoute from "./routers/register.js";
import mongoose from "mongoose";

const app = express();
dotEnv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("database connected successfully"));

app.use(registerRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
