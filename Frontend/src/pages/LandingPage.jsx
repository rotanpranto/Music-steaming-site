import React from "react";

import LpNavBar from "../components/login/LpNavbar.jsx";
import Carousels from "../components/Carousel/Carousel.jsx";
import Loginsignup from "../components/login/LoginSignup.jsx";
// import Loginto from "./login.jsx"
// import Signupto from "./signup.jsx"
import'./LandingPage.css'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function LandingPage() {
    return ( 
        <div className="LandingPage">
        <div className = "background" >
        <LpNavBar /> <h1 className = "greetings" > Wellcome to KOBIGAAN </h1>  <Carousels />
        <loginto />
        <Loginsignup />
        <div style={{color: "white"}} className="icons">
                <FaFacebook size={40}/>
                <FaInstagram size={40}/>
                <FaTwitter size={40}/>
                <FaYoutube size={40}/>
            </div>
        </div> 
        </div> 
        )
}

export default LandingPage;
