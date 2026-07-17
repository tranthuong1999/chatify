import express from "express";
import {
  login,
  signUp,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { arcjetProtection } from "../middlewares/arcjet.middlewares.js";

const router = express.Router();

router.use(arcjetProtection);
router.post("/login", login);
router.post("/sign-up", signUp);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
