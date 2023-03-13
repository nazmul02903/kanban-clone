import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotEnv.config();
app.use(cors());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
