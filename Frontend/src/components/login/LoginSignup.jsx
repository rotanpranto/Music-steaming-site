import React from "react";
import { Link } from "react-router-dom";
import'./Loginsignup.css'

function Loginsignup() {
  return (
    <div className = "loginsignup" >
        <h1 > Try KOBIGAAN for free </h1>
      <Link to={"/SignUp"}>
      <button className="button">Signup</button>
      </Link>
      <h1>Already have an Account</h1>
      <Link to={"/Login"}>
        <button className="button1">Login</button>
      </Link>
    </div>
  );
}

export default Loginsignup;
