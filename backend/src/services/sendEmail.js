

import { resend } from "../config/resend.js";

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const data = await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });

        return data;
    } catch (error) {
        throw error;
    }
};