import express from "express";
import {
  getAllContacts,
  sendMessage,
  getChatPartners,
  getMessagesByUserId,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(protectRoute); // Apply the protectRoute middleware to all routes in this router
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
