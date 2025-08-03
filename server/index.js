import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import verifyJWT from "./middlewares/verifyJWT.js";
import connectDB from "./config/db.js";
import cors from "cors"
import postRouter from "./routes/post.route.js";
connectDB();
dotenv.config();
const app = express();


app.use(cors())
app.use(express.json());
app.use("/auth" , authRouter);
app.use("/api" , verifyJWT , postRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
