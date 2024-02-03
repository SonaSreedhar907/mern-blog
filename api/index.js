import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();
app.use(express.json())

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Database Connected");
    } catch (error) {
        throw error;
    }
}

app.use('/api/auth',authRoutes)

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