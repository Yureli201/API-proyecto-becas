import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URL
const dbName = process.env.MONGODB_NAME

mongoose
  .connect(uri, {dbName} )
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  });

export default mongoose;