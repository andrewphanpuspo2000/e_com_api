import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    // con && console.log(con);
  } catch (error) {
    console.log(error.message);
  }
};

export default mongoConnect;
