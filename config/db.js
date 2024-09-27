import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('Mongo URI is not defined in environment variables');
    }
    await connect(uri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
