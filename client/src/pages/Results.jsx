import { React, useState, useEffect, useRef } from "react";
import shipping from "../assets/icons/free-delivery.png";
import stars from "../assets/icons/stars.png";
import "../styles/css/Results.css";

// const secundaria1 = 
// const secundaria2 =
// const secundaria3 =
// const secundaria4 =

function Results() {
    const [similarArr, setSimilarArr] = useState([]);

    const [matchingName, setMatchingName] = useState(null);
    const [matchingData, setMatchingData] = useState(null);

    useEffect(() => {
        const storedSimilar = localStorage.getItem('similar');
        const storedMatchingData = localStorage.getItem('matching');
        if (storedMatchingData) {
            const matching = JSON.parse(storedMatchingData);

            // Access the 'name' and 'data' fields directly
            if (matching.name && matching.data) {
                setMatchingName(matching.name);
                setMatchingData(matching.data);
            }
        }
        if(storedSimilar) {
            const similar = JSON.parse(storedSimilar)
            setSimilarArr(similar);
        }
    }, []);

    const fotoPrincipal = matchingData;
    console.log(fotoPrincipal);
    
    console.log(similarArr);
    
    return (
        <div>
            <div className="container">
                <div className="item">
                    <img src={`data:image/jpeg;base64,${fotoPrincipal}`} alt="Imagen 1" />
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

            <div className="containerLargo">
                <div className="containerColumn">
                    <div className="itemBlanco2">
                        <label><strong>Info </strong></label>
                    </div>
                    <div className="itemBlanco2">
                        <label>
                            <p><strong>Details:</strong></p>
                            <p>la vida es buena pero me quiero matar porque tengo sueño</p>
                        </label>
                    </div>
                    <div className="itemBlanco2">
                        <label>
                            <p><strong>Made of:</strong></p>
                            <p>dmmvekfgjerkfnernflerngfle,nl</p>
                        </label>
                    </div>
                </div>

                <div className="containerColumn">
                    <div className="item2">
                        <label><strong>You might like...</strong></label>
                    </div>
                    {/* <div className="item2">
                        <img src={⁠ data:image/jpeg;base64,${secundaria1} ⁠} alt="Imagen 2" className="like-image"/>
                        <img src={⁠ data:image/jpeg;base64,${secundaria2} ⁠} alt="Imagen 3" className="like-image"/>
                        <img src={⁠ data:image/jpeg;base64,${secundaria3} ⁠} alt="Imagen 3" className="like-image"/>
                        <img src={⁠ data:image/jpeg;base64,${secundaria4} ⁠} alt="Imagen 3" className="like-image"/>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Results;