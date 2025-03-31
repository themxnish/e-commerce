import express from "express";
import { registerUser, loginUser, admin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/admin", admin);

export default userRouter;