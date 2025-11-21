import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb://localhost:27017/becas_db"
  ) 
  .then((db) => console.log("DB connected"))
  .catch((err) => console.log(err));

export default mongoose;