
import jwt from "jsonwebtoken";
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log({ token })
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log({ decoded })
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const use = await User.findById(decoded.id).select("-password");
        if (!use) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = use;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error);
        return res.status(401).json({ message: "Unauthorized - Error verifying token" });
    }

}
