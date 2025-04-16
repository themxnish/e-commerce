import express from "express";
import { registerUser, loginUser, admin, getCurrentUser, updateUser } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", admin);
userRouter.get("/current", authUser, getCurrentUser);
userRouter.post("/update", authUser, updateUser);

export default userRouter;