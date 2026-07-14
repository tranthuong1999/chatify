
import express from 'express';
import { getAllContacts, getMessagsByUserId, sendMessage, getChatPartners } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middlewares.js';

const router = express.Router();


router.use(protectRoute); // Apply the protectRoute middleware to all routes in this router
router.get('/contact', getAllContacts);
router.get('/chat', getChatPartners);
router.get('/:id', getMessagsByUserId);
router.post("/send/:id", sendMessage);


export default router;