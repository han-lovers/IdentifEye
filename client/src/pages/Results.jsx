import { React, useState, useRef } from "react";
import camisa1 from "../assets/icons/camisa1.jpeg";
import camisa2 from "../assets/icons/camisa2.jpeg";
import camisa3 from "../assets/icons/camisa3.jpeg";
import camisa4 from "../assets/icons/camisa4.jpeg";
import shipping from "../assets/icons/free-delivery.png";
import stars from "../assets/icons/stars.png";
import "../styles/css/Results.css";

function Results() {
    return (
    <div>
      <div className="container">
        <div className="item">
        <img src={camisa1} alt="Imagen 1" />
            </div>
        <div className="itemBlanco">
            <div className="containerColumn">
                <div className="itemBlanco"> 
                    <label><strong>
                Camisa rosa con no se que, matenme, casate conmigo artemio
                    </strong></label>
                </div>

                <div className="itemBlanco"> 
                        <label>
                        Suave camisa, perfecta para morir
                        </label>
                </div>
                <div className="itemBlanco"> 
                        <lp>
                        $500.00
                        </lp>
                        <img src={stars} alt="Stars" className="small-image" />
                </div>
                <div className="itemBlanco"> 
                        <label>
                        <img src={shipping} alt="Free shipping" className="small-image" />
                        <span>                Free shipping</span>
                        </label>
                </div>
            </div>
        </div>
    </div>  

    <div className="container">
        <div className="containerColumn">
            <div className="itemBlanco2">
                <label><strong>Info </strong></label>
            </div>
            <div className="itemBlanco2">
                <label>Details</label>
            </div>
            <div className="itemBlanco2">
                <label>Made of</label>
            </div>
        </div>

            <div className="containerColumn">
                <div className="item2">
                    <label><strong>You might like...</strong></label>
                </div>
                <div className="item2">
                    <img src={camisa2} alt="Imagen 2" className="like-image"/>
                    <img src={camisa3} alt="Imagen 3" className="like-image"/>
                    <img src={camisa4} alt="Imagen 4" className="like-image"/>
                    <img src={camisa2} alt="Imagen 2" className="like-image"/>
                    <img src={camisa3} alt="Imagen 3" className="like-image"/>
                    <img src={camisa4} alt="Imagen 4" className="like-image"/>
                </div>
            </div>
        </div>
    </div>
    );
  }

export default Results; 