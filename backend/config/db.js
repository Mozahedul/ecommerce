import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  // For remote server
  // const PORT = process.env.MONGO_URI;
  // For local server
  const PORT = process.env.LOCAL_MONGO_URI;
  try {
    const conn = await mongoose.connect(PORT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      colors.cyan.bold.underline(`MongoDB connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.log(colors.red.bold.underline(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
