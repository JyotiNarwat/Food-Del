import React, { useContext, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../../context/Storecontext'
import axios from 'axios'
//import { Link } from 'react-router-dom';


const Placeorder = () => {
  const {getTotalCartAmount,token,food_list,cartItems} = useContext(StoreContext)
  const[data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street: "",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })



  const onChangeHandler =(event)=>{
    const name=event.target.name;
    const value = event.target.value;
    setData(data=>({...data ,[name]:value}))
  }
  
  const placeOrder = async (event) => {
    try{
    event.preventDefault();
    let orderItems =[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        //let itemInfo = item;
        //itemInfo["quantity"]= cartItems[item._id];
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }

    let response = await axios.post("http://localhost:4000/api/order/place" , orderData , {headers:{token}});
    if(response.data.success){
    //   const {session_url} = response.data.success_url;
    //  // 
    //  window.location.replace(session_url);
    
    //const {session_url} = response.data.success_url; 
   // window.location.replace(session_url);
     window.location.href = "/verify";
   // navigate(session_url);
  // }else{
  //   const session_url= response.data.failure_url;
  //   window.location.href = session_url;
  // }
}
    }
    catch(error){
      console.log("error");
    }
    
  }

  return (
   <form onSubmit={placeOrder} action="" className="placeorder">
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="mutli-fields">
        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
        <input name='lastName' onChange={onChangeHandler} value={data.lastName}type="text" placeholder='Last Name' />
      </div>
      <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email Address' />
      <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
      <div className="multi-fields">
        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
      </div>
      <div className="mutli-fields">
        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode}type="number" placeholder='Pin Code' />
        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />

      </div>
      <input required name='phone' onChange={onChangeHandler} value={data.phone}type="text" placeholder='Phone No.'/>
    </div>
    <div className="placeorder-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
        <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
    </div>
   </form>
  )
}

export default Placeorder
