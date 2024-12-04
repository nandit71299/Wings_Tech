import mongoose from "mongoose";
const uri = "mongodb://localhost:27017/";
const connect = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));
};

export default connect;
