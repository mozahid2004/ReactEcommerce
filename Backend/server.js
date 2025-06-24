import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config();
const app = express();
app.use(express.json()); // Required to parse JSON request bodies

// ✅ Middleware first
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
app.use(cors());


app.use(express.json());

// product from DB
app.use('/api/products', productRoutes);

// ✅ Connect DB before routes
const startServer = async () => {
  try {
    await connectDB();

    // ✅ Routes after DB connection
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/products', productRoutes);


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
