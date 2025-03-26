import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface EmailData {
    name: string;
    email: string;
    selection: string;
    message: string;
    ip: string;
}

export const sendEmail = async (data: EmailData) => {
    // Read email template
    const templatePath = path.join(__dirname, '../templates/email.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html.replace('{{name}}', data.name)
        .replace('{{email}}', data.email)
        .replace('{{selection}}', data.selection)
        .replace('{{message}}', data.message)
        .replace('{{ip}}', data.ip);

    // Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    // Send email
    await transporter.sendMail({
        from: `"Oblivion Media" <${process.env.FROM_EMAIL}>`,
        to: process.env.TO_EMAIL,
        subject: 'New Contact Form Submission',
        html: html
    });
};