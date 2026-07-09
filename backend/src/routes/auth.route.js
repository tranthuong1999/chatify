
import express from 'express';

const router = express.Router();

router.get('/signin', (req, res) => {
    res.send('Sign In API');
});

router.get('/signup', (req, res) => {
    res.send('Sign Up API');
});

router.get('/login', (req, res) => {
    res.send('Login API');
});

export default router;