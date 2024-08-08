import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.routes.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected 🌐'))
.catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions = {
    origin: 'http://localhost:5173/',
    credentials: true,
}
app.use(cors(corsOptions));


app.use('/api/v1/user',userRoute);


app.get("/health", async (req, res) => {
    res.send({ message: "health OK!" });
  });






app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})