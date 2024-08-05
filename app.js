import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected 🌐'))
.catch(err => console.log(err));







app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})