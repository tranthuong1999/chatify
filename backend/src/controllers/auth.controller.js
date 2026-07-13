import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import { emailTemplate } from '../templates/emailTemplate.js';
import { sendEmail } from '../services/sendEmail.js';

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
        console.log("optimise email regex");
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
        await sendEmail({
            to: email,
            subject: "Welcome",
            html: emailTemplate(fullName, process.env.CLIENT_URL),
        });
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

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    generateToken(user._id, res);
    res.status(200).json({
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
    });
}

export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
}