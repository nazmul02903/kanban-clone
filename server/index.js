import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import registerRoute from "./routers/register.js";
import boardRoute from "./routers/board.js"
import sectionRoute from "./routers/section.js"
import mongoose from "mongoose";
import multer from "multer"

const app = express();
dotEnv.config();
const upload = multer({ dest: "./uploads" });

app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(upload.array());

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("database connected successfully"));

app.use(registerRoute);
app.use(boardRoute);
app.use(sectionRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
