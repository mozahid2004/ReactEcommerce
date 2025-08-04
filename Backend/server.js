// 📦 Core dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// 🔗 Custom modules
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js';
import supportRoutes from './routes/support.js';




// ✅ Load environment variables from .env
dotenv.config();

// 🚀 Initialize Express app
const app = express();

// ✅ Global Middlewares
app.use(cors());                 // Enable CORS for frontend-backend connection
app.use(express.json());        // Parse incoming JSON requests

// ✅ Health Check Route
app.get('/api/ping', (req, res) => {
  res.send('✅ API is alive');
});

// ✅ Register API Routes
app.use('/api/auth', authRoutes);              // 🔐 Auth (Login/Register)
app.use('/api/user', userRoutes);              // 👤 User endpoints (cart, address)
app.use('/api/products', productRoutes);       // 🛒 Products endpoints
app.use('/api/order', orderRoutes);            // 📦 Orders (COD/Razorpay)
app.use('/api/payment', paymentRoutes);        // 💳 Payments (Razorpay, UPI)
app.use('/api/admin/users', adminUserRoutes);  // ⚙️ Admin user control
app.use('/api/support', supportRoutes);

// ✅ Serve static files (e.g., uploaded images)
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Start the server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}/api`)
    );
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
