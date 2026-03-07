import React, {useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';

const Verify = () => {

    const [searchParams , setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId= searchParams.get("orderId")
    console.log(success,orderId);
    //const{url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayments =async (req,res) => {
        const response = await axios.post ("http://localhost:4000/api/order/verify" , {success, orderId});
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/");
        }
    }

    useEffect(()=>
        {
           verifyPayments();
        },[])
    
  return (
    <div className='verify'>
      <div className="spinner">
      </div>
    </div>
  )
}

export default Verify
