import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'
import cookie from 'cookie-parser'

dotenv.config();

const app = express();
app.use(express.json())
app.use(cookie())

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Database Connected");
    } catch (error) {
        throw error;
    }
}

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
app.use('/api/comment',commentRoutes)

app.listen(5005, () => {
    connect();
    console.log('Server is running on port 5005');
});


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})