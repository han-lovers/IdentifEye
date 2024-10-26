import { React, useState, useRef } from "react";
import typeImage from "../assets/icons/upload.png";
import "../styles/css/Scan.css";

function SingleFileUploader({ setShowImage }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setShowImage(false);
        }
    };

    const handleUpload = async () => {};

    return (
        <div className="subeFile">
            <div className="input">
                <input id="file" type="file" onChange={handleFileChange} />
            </div>
            {file && (
                <button onClick={handleUpload} className="submit">
                    Submit
                </button>
            )}
        </div>
    );
}

function Scan() {
    const [showOptions, setShowOptions] = useState(false);
    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    };

    const [showFile, setShowFile] = useState(false);
    const [showImage, setShowImage] = useState(true);
    const uploadFile = useRef(null);

    const handleUploadPhoto = () => {
        setShowFile(true);
        setShowImage(false);
        setShowOptions(false);
        uploadFile.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <main>
                <div className="card">
                    {showImage ? (
                        <>
                            <img
                                src={typeImage}
                                alt="Type"
                                className="image-style"
                            />
                            <p>
                                <strong>Upload your image</strong>
                            </p>
                        </>
                    ) : (
                        <SingleFileUploader setShowImage={setShowImage} />
                    )}
                    <button className="Button" onClick={handleShowOptions}>
                        Choose
                    </button>
                    {showOptions && (
                        <div className="listOption">
                            <button className="listButtonOption">
                                Take a photo
                            </button>
                            <button
                                className="listButtonOption"
                                onClick={handleUploadPhoto}
                            >
                                Upload a photo
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default Scan;
