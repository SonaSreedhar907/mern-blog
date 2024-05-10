import express from 'express';
import cors from 'cors'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import cookieParser from 'cookie-parser'; 

import path from 'path'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)

dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Database Connected");
    } catch (error) {
        throw error;
    }
}


const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors()); 



app.listen(5005, () => {
    connect();
    console.log('Server is running on port 5005');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);



//use the client app
app.use(express.static(path.join(__dirname,'/client/dist')))

//render client for any path
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/client/dist/index.html')))

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});