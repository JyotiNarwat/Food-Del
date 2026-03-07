import express from"express"
import cors from "cors"
import { connectDb } from './config/db.js'
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"


//app config
const app = express()
const port =4000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors());

connectDb();
app.use("/uploads", express.static("uploads"));


app.use("/api/food" , foodRouter);
app.use("/api/user" , userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order" , orderRouter);

app.get("/", (req,res)=>{
    res.send("api working")
})
app.listen(port ,()=>{
    console.log("app is listening")
})
//mongodb+srv://jyotinarwat390:PREMWATI8178@cluster0.4hirvxc.mongodb.net/?appName=Cluster0
