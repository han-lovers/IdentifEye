import { React, useState, useEffect, useRef } from "react";
import shipping from "../assets/icons/free-delivery.png";
import stars from "../assets/icons/stars.png";
import "../styles/css/Results.css";

function Results() {
    const [similarArr, setSimilarArr] = useState([]);

    const [matchingName, setMatchingName] = useState(null);
    const [matchingData, setMatchingData] = useState(null);

    useEffect(() => {
        const storedSimilar = localStorage.getItem("similar");
        const storedMatchingData = localStorage.getItem("matching");
        if (storedMatchingData) {
            const matching = JSON.parse(storedMatchingData);

            // Access the 'name' and 'data' fields directly
            if (matching.name && matching.data) {
                setMatchingName(matching.name);
                setMatchingData(matching.data);
            }
        }
        if (storedSimilar) {
            const similar = JSON.parse(storedSimilar);
            setSimilarArr(similar);
        }
    }, []);

    const fotoPrincipal = matchingData;
    console.log(similarArr);

    // const sec2 = similarArr[1];
    // const sec3 = similarArr[2];
    // const sec4 = similarArr[3];

    // const secundaria1 = sec1.data;

    return (
        <div>
            <div className="container">
                <div className="item">
                    <img
                        src={`data:image/jpeg;base64,${fotoPrincipal}`}
                        alt="Imagen 1"
                    />
                </div>
                <div className="itemBlanco">
                    <div className="containerColumn">
                        <div className="itemBlanco">
                            <label>
                                <strong>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Adipisci perspiciatis
                                    tempora repudiandae quidem veritatis
                                    blanditiis? Ullam cum laboriosam suscipit
                                    tenetur minima eaque asperiores rerum minus
                                    numquam, voluptatum eius itaque. In.
                                </strong>
                            </label>
                        </div>

                        <div className="itemBlanco">
                            <label>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Perspiciatis
                            </label>
                        </div>
                        <div className="itemBlanco">
                            <lp>$500.00</lp>
                            <img
                                src={stars}
                                alt="Stars"
                                className="small-image"
                            />
                        </div>
                        <div className="itemBlanco">
                            <label>
                                <img
                                    src={shipping}
                                    alt="Free shipping"
                                    className="small-image"
                                />
                                <span> Free shipping</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="containerLargo">
                <div className="containerColumn">
                    <div className="itemBlanco2">
                        <label>
                            <strong>Info </strong>
                        </label>
                    </div>
                    <div className="itemBlanco2">
                        <label>
                            <p>
                                <strong>Details:</strong>
                            </p>
                            <p>
                               Lorem ipsum, dolor sit amet consectetur 
                            </p>
                        </label>
                    </div>
                    <div className="itemBlanco2">
                        <label>
                            <p>
                                <strong>Made of:</strong>
                            </p>
                            <p>Lorem ipsum dolor sit </p>
                        </label>
                    </div>
                </div>

                <div className="containerColumn">
                    <div className="item2">
                        <label>
                            <strong>You might like...</strong>
                        </label>
                    </div>
                    <div className="item2">
                        {/* <img src={`data:image/jpeg;base64,${secundaria1}`} alt="Imagen 2" className="like-image"/> */}
                        {/* <img src={⁠ data:image/jpeg;base64,${secundaria2} ⁠} alt="Imagen 3" className="like-image"/>
                        <img src={⁠ data:image/jpeg;base64,${secundaria3} ⁠} alt="Imagen 3" className="like-image"/>
                        <img src={⁠ data:image/jpeg;base64,${secundaria4} ⁠} alt="Imagen 3" className="like-image"/> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;
