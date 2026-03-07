import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
//import { useEffect } from 'react';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
    const [currState ,setCurrState] = useState("Sign Up");
    const {url ,setToken} = useContext(StoreContext)
    const [data,setData] =useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }
    
    const onLogin = async (event)=>{
      event.preventDefault();
      let newurl=url;
      if(currState==="Login"){
        newurl+= "/api/user/login"
      }else{
        newurl+="/api/user/register"
      }
    //   const response = await  axios.post(newurl,data);
    // if(response.data.success){
    //   setToken(response.data.token);
    //   localStorage.setItem("token" , response.data.token);
    //   setShowLogin(false);
    // }else{
    //   alert(response.data.message);
    // }
     try {
    const response = await axios.post(newurl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }


    }
  return (
    <div className='loginpopup'>
     <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='/' ></img>
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name="name" onChange={onChangeHandler} value={data.name} placeholder="Your Name" type="text" required/>}
             <input name="email" onChange={onChangeHandler} value={data.email} placeholder="Your email" type="email" required/>
              <input name="password" onChange={onChangeHandler} value={data.password} placeholder="password" type="password" required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-condition">
            <input required type='checkbox'/>
            <p>By continuing ,i agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login" 
        ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have a account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
     </form>
    </div>
  )
}

export default LoginPopup
