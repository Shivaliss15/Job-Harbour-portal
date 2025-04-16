import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10, // Optional: Connection pool size
        serverSelectionTimeoutMS: 5000, // Fail fast if no DB
      });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;