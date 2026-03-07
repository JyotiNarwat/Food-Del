import mongoose from "mongoose";

 export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://jyotinarwat390:PREMWATI8178@cluster0.4hirvxc.mongodb.net/food-del').then(()=> console.log("db connected"));
}
