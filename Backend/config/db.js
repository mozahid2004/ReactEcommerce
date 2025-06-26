// config/db.js

// 📦 Import Mongoose to interact with MongoDB
import mongoose from 'mongoose';

// 🔌 Function to connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // ✅ These options help avoid deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // ✅ Successful connection log
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // ❌ Error handling
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

// 🔄 Export the function for use in server.js
export default connectDB;
