import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

console.log("✅ Auth Routes Loaded");

router.get("/test", (req, res) => {
  res.json({ message: "Auth Route Working" });
});

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully!",
    user: req.user,
  });
});

router.post("/register", register);
router.post("/login", login);

export default router;