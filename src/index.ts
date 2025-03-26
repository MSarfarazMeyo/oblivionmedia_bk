import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import emailRouter from './routes/email';


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/email', emailRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});