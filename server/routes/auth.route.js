import express from "express"
import {register as registerController ,
     login as loginController, 
     logout as logoutController ,
      getMe} from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js"
const authRouter = express.Router();


authRouter.route("/register").post(registerController);
authRouter.route("/login").post(loginController);
authRouter.route("/me").get(verifyJWT , getMe);
authRouter.route("/logout").get(logoutController );

export default authRouter;