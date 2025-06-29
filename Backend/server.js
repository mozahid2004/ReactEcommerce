// server/server.js

// 📦 Import core dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// 🔗 Import custom modules
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js'


// ✅ Load environment variables from .env
dotenv.config();

// 🚀 Initialize Express app
const app = express();

// ✅ Enable CORS (for frontend-backend communication)
app.use(cors());

// ✅ Parse incoming JSON requests
app.use(express.json());

// ✅ Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB first

    // ✅ Mount API routes
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/admin/users', adminUserRoutes);


    const PORT = process.env.PORT || 5000;

    // ✅ Start server on defined port
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1); // Exit app if DB fails to connect
  }
};

startServer(); // ❌ You had a backslash here (\), removed it ✅
