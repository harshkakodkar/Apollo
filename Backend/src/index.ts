import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import doctorRoutes from './routes/doctorRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', doctorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
