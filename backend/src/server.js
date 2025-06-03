import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.config.js';
import userRoutes from './routes/user.route.js';
import photoRoutes from './routes/photo.route.js';
import commentRoutes from './routes/comment.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Serve static files from src/uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// API routes
app.use('/api/user', userRoutes);
app.use('/api/photo', photoRoutes);
app.use('/api/comment', commentRoutes);
console.log('Serving static files from:', path.join(__dirname, 'uploads'));


const PORT = process.env.PORT || 5001;
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});