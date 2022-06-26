import "dotenv/config";
import "./database/connectdb.js"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route.js';


const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/auth/", authRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`🔥🔥 http://localhost:${PORT}`));