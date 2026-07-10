
import express from 'express';
import { signIn, signUp, login } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/signin', signIn);

router.post('/signup', signUp);

router.get('/login', login);

export default router;