import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt=''/>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum quidem laudantium, numquam architecto eveniet repellendus nesciunt reprehenderit fuga, mollitia delectus error odit laborum aliquid ipsum facere? Iure debitis consectetur porro?</p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon}/>
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>Phone No: 9266204276</li>
            <li>tomatobyjyoti@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copy-right">Copyright 2024 @tomato - All rights reserved to JYOTI!!</p>
    </div>
  )
}

export default Footer
