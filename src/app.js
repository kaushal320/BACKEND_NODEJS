import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

//routes
import userRoutes from './routes/user.route.js';

//routes declaration
app.use('/api/users', userRoutes);
export default app; 

