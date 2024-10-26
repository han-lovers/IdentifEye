import { React, useState, useRef } from "react";
import WebcamCapture from "../components/webcam.jsx";
import typeImage from "../assets/icons/upload.png";
import "../styles/css/Scan.css";

function SingleFileUploader({
    setShowImage,
    setImage,
    setIsConfirmed,
    handleCancel,
}) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setShowImage(false);
        }
    };
    // const handleImage = () => {
    //     setImage(URL.createObjectURL(file));
    //     setIsConfirmed(true); // Reset the left side of the screen
    //     setFile(null);
    //     setShowImage(true);
    // };

    /**
     * @brief Upload the file to the server
     */
    const handleUpload = async () => {
        setImage(URL.createObjectURL(file));
        setIsConfirmed(true); // Reset the left side of the screen
        setFile(null);
        setShowImage(true);
        // Don't let user to submit if there is no file
        event.preventDefault();

        const fromData = new FormData();
        fromData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: fromData,
            });
            const data = await response.json();

            const message = data.message;
            const filePath = data.file_path;

            console.log("Message: ", message);
            console.log("File path: ", filePath);
        } catch (error) {
            console.log("Error while fetching: ", error);
        }
    };

    return (
        <div className="subeFile">
            <h2>
                <strong>Choose your file</strong>
            </h2>
            <div className="input">
                <input id="file" type="file" onChange={handleFileChange} />
            </div>
            {file && (
                <>
                    <button onClick={handleUpload} className="submit">
                        Submit
                    </button>
                    <button onClick={handleCancel} className="cancel">
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
}

function Scan() {
    const [showOptions, setShowOptions] = useState(false);
    const [isTakingPhoto, setIsTakingPhoto] = useState(false);
    // TODO: Make image global
    const [image, setImage] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false); // Estado para confirmar la imagen

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

    const handleCancel = () => {
        setShowFile(false);
        setShowImage(true);
        setShowOptions(false);
        setImage(null);
        setIsConfirmed(false);
        setIsTakingPhoto(false); // Ensure photo-taking state is reset
    };

    const handleConfirm = (capturedImage) => {
        setImage(capturedImage);
        setIsTakingPhoto(false);
        setIsConfirmed(true);
        setShowFile(false);
        setShowImage(true);
        setShowOptions(false);
    };

    return (
        <>
            <main>
                <div
                    className={`card ${image ? "card-large" : ""}`}
                    style={{ display: isTakingPhoto ? "none" : "block" }}
                >
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
                        <SingleFileUploader
                            setShowImage={setShowImage}
                            setImage={setImage}
                            setIsConfirmed={setIsConfirmed}
                            handleCancel={handleCancel}
                        />
                    )}
                    <button className="Button" onClick={handleShowOptions}>
                        Choose
                    </button>
                    {showOptions && (
                        <div className="listOption">
                            <button
                                className="listButtonOption"
                                onClick={() => {
                                    setIsTakingPhoto(true);
                                    setShowOptions(false);
                                }}
                            >
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

                {/* Mostrar Webcam o Imagen Capturada */}
                {isTakingPhoto ? (
                    <WebcamCapture
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                    />
                ) : (
                    image &&
                    isConfirmed && ( // Solo mostrar si la imagen no ha sido confirmada
                        <div
                            className="webcam-container"
                            style={{ textAlign: "center" }}
                        >
                            <h2>Imagen confirmada:</h2>
                            <img
                                src={image}
                                alt="Captured"
                                style={{
                                    width: "100%",
                                    maxWidth: "400px",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                    )
                )}
            </main>
        </>
    );
}

export default Scan;
