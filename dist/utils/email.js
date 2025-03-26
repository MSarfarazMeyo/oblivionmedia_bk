"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Read email template
    const templatePath = path_1.default.join(__dirname, '../templates/email.html');
    let html = fs_1.default.readFileSync(templatePath, 'utf8');
    // Replace placeholders
    html = html.replace('{{name}}', data.name)
        .replace('{{email}}', data.email)
        .replace('{{selection}}', data.selection)
        .replace('{{message}}', data.message)
        .replace('{{ip}}', data.ip);
    // Create transporter
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    // Send email
    yield transporter.sendMail({
        from: `"Oblivion Media" <${process.env.FROM_EMAIL}>`,
        to: process.env.TO_EMAIL,
        subject: 'New Contact Form Submission',
        html: html
    });
});
exports.sendEmail = sendEmail;
