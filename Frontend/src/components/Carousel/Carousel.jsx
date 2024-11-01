import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import'./Carousel.css'

function Carousels() {
    return ( <Carousel className = "carousel" >
        <Carousel.Item >
        <img className = "pic" src = { require('./image-1.jpg') }alt = "First slide" />
        </Carousel.Item> 
        <Carousel.Item >
        <img className = "pic" src = { require('./image-2.jpg') } alt = "Second slide" />
        </Carousel.Item> <Carousel.Item >
        <img className = "pic" src = { require('./image-3.jpg') } alt = "Third slide" />
        </Carousel.Item>  
        <Carousel.Item >
        <img className = "pic" src = { require('./image-4.jpg') } alt = "Forth slide" />
        </Carousel.Item> 
        </Carousel >
    );
}

export default Carousels;
