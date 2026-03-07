import userModel from '../models/userModel.js'


// const addToCart = async (req,res)=>{
//   try {
//     let userData = await userModel.findOne({_id:req.body.itemId});
//     let cartData = await userData.cartData;
//     if(!cartData[req.body.itemId]){
//         cartData[req.body.itemId] =1;
//     }else{
//         cartData[req.body.itemId] +=1;
//     }
//     await userModel.findByIdAndUpdate(req.body.userId ,{cartData});
//     res.json({success:true ,message:"Added to Cart"});
//   } catch (error) {
//     console.log(error);
//     res.json({success:false , messsage:"error"});
//   }
// }

const addToCart = async (req, res) => {
  try {
    // Find the user by userId
    let userData = await userModel.findOne({ _id: req.body.userId });

    // If user not found, handle gracefully
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it's null/undefined
    let cartData = userData.cartData || {};

    // Add or increment item count
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // Update user cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}
const removeFromCart = async (req,res) => {
    try {
    let userData = await userModel.findOne({_id:req.body.userId});
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId ,{cartData});
    res.json({success:true ,message:"Removed from Cart"});
  } catch (error) {
    console.log(error);
    res.json({success:false , messsage:"error"});
  }
}


const getCart = async (req,res) => {
    try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true ,cartData});
  } catch (error) {
    console.log(error);
    res.json({success:false , messsage:"error"});
  }
}


export {addToCart,removeFromCart,getCart}