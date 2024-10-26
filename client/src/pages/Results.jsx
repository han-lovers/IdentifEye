import { React, useState, useRef } from "react";
import camisa1 from "../assets/icons/camisa1.jpeg";
import camisa2 from "../assets/icons/camisa2.jpeg";
import camisa3 from "../assets/icons/camisa3.jpeg";
import camisa4 from "../assets/icons/camisa4.jpeg";
import shipping from "../assets/icons/free-delivery.png";
import "../styles/css/Results.css";

function Results() {
    return (
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
                        <label>
                        $500.00
                        </label>
                </div>
                <div className="itemBlanco"> 
                        <label>
                        <img src={shipping} alt="Envio gratis" className="small-image" />
                        </label>
                </div>
            </div>
        </div>
    </div>
    );
  }

export default Results; 