import { React, useState } from "react";
import typeImage from "../assets/icon/upload.png";
import "../Style/css/Scan.css";

function Scan() {
    const [showOptions, setShowOptions] = useState(false);
    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <>
            <main>

                <div className="card">
                    <img
                        src={typeImage}
                        alt="Type"
                        className="image-style"
                    ></img>

                    <p>
                        {" "}
                        <strong>Upload your image</strong>{" "}
                    </p>

                    <button className="Button" onClick={handleShowOptions}>
                        {" "}
                        Choose{" "}
                    </button>

                    {showOptions && (
                        <div className="listOption">
                            <button className="listButtonOption">
                                {" "}
                                Take a photo{" "}
                            </button>
                            <button className="listButtonOption">
                                {" "}
                                Upload a photo{" "}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default Scan;