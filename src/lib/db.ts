// module.exports = databasesConnect;
import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const dbConnect = async () => {
  if (connection.isConnected) return;
  const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });
  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
