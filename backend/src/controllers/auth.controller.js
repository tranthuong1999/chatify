import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';

export const signUp = async (req, res) => {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword, fullName });

    if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
}

export const signIn = async (req, res) => {
    res.send('Sign In API');
}

export const login = async (req, res) => {
    res.send('Login API');
}