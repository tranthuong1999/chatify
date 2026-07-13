import express from 'express';
import { login, signUp, logout, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middlewares.js';
import { arcjetProtection } from '../middlewares/arcjet.middlewares.js';

const router = express.Router();

router.use(arcjetProtection);
router.post('/login', login);
router.post('/signup', signUp);
router.post('/logout', logout);
router.put('/update-profile', protectRoute, updateProfile);



export default router;