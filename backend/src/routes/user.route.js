import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getAllUserController,
  getUserByIdController,
  updateUserByIdController,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/auth/register", registerUserController);
router.post("/auth/login", loginUserController);
router.post("/auth/logout", logoutUserController);
router.get("/", verifyToken, getAllUserController);
router.get("/:uId", verifyToken, getUserByIdController);
router.put("/:uId", verifyToken, updateUserByIdController);
export default router;
