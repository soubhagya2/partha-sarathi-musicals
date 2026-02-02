import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const connectDB = async () : Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Atlas Connected');
  } catch (err : any) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;