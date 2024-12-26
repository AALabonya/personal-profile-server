import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: "ikraamoni@gmail.com",
            pass: `${config.sender_app_password}`,
        },
    });

    await transporter.sendMail({
        from: 'ikraamoni@gmail.com', 
        to,
        subject: "Forgot your password?Don't worry!! We've got you covered", 
        text: "",
        html, 
    });
};