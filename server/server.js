import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import exhibitRoutes from './routes/exhibitRoutes.js';

const app = express();
app.use(cors());
connectDB()

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
res.status(200).json({ message: 'API is running smoothly' });
});

app.use('/api/exhibits', exhibitRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

