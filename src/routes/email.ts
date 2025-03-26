import express from 'express';
import { sendEmail } from '../utils/email';

const router = express.Router();

router.post('/send', async (req, res) => {
    try {


        await sendEmail({
            name: req.body.name,
            email: req.body.email,
            selection: req.body.selection,
            message: req.body.message,
            ip: req.body.ip
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default router;