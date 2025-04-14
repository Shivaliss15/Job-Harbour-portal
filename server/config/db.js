import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
  // Attach the listener before calling connect()
  mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });

  try {
    const connectionString = `${process.env.MONGODB_URI}/job-portal`;
    console.log('Final MongoDB connection string:', connectionString);
    
    // Connect to MongoDB with the URI
    await mongoose.connect(connectionString);

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
