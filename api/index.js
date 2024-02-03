import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Database Connected");
    } catch (error) {
        throw error;
    }
}

app.listen(5005, () => {
    connect();
    console.log('Server is running on port 5005');
});
