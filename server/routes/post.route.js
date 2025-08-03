import express from "express"
import { getAllPosts , createPost , deletePost } from "../controllers/post.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
const postRouter = express.Router();

postRouter.route("/posts").get(getAllPosts);
postRouter.route("/posts").post(createPost);
postRouter.route("/posts/me").get(createPost);
postRouter.delete("/posts/:id", verifyJWT, deletePost);


export default postRouter;