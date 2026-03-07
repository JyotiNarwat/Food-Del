import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
//import stripe from "stripe"


const placeOrder = async (req,res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            address:req.body.address,
            amount:req.body.amount
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId , {cartData:{}});
        
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency :"inr",
                product_data :{
                 name:item.name
                },
                unit_amount : item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
              currency:"inr",
              product_data:{
                name:"delivery Charges"
              },
              unit_amount:2*100*80
            },
            quantity:1
        })
          
        const frontend_url = "http://localhost:5173";
         const success_url = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;
         const failure_url = `/verify?success=false&orderId=${newOrder._id}`;

        return res.json({success:true , success_url ,  message : "Order placed"});
    } catch (error) {
        console.log(error);
        return res.json({success:false , message:"error"})
    }
}

const verifyOrder =async(req,res)=>{

     const{orderId, success}=req.body;
     try{
        if(success="true"){
            await orderModel.findByIdAndUpdate(orderId , {payment:true});
            res.json({success:true , message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false ,message:"Not paid"})
        }
     }catch(error){
        console.log(error);
        res.json({success:error , message:"error"})
     }
}

const listOrder = async (req,res) => {
    try {
        const orders= await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({successfalse , message:"error"})
    }
}
export {placeOrder ,verifyOrder , listOrder}