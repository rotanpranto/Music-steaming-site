import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function LpNavBar() {
  return (
    <Navbar bg = "dark" variant = "dark" >
        <Container className = "contain" >
        <Navbar.Brand href = "#" > KOBIGAAN </Navbar.Brand>
        <Navbar.Text > 
        <Link to={"/Login"}>
            <a href = "#login"> Logn </a>
            </Link>  
            </Navbar.Text>
        </ Container > 

        </Navbar >
  );
}

export default LpNavBar;
