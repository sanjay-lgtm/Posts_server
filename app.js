import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes  from './routes/postRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected 🌐'))
.catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api',postRoutes );





app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})