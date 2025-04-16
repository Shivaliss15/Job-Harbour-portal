import mongoose from "mongoose";

//Function to connect to the mongodb database
const connectDB = async () => {
    
   // Log the MongoDB URI to ensure it's being loaded correctly
    console.log('MongoDB URI:', process.env.MONGODB_URI);

    mongoose.connection.on('connected', ()=>console.log('Database connected'))

    await mongoose.connect( `${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB