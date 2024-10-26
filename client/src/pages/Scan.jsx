import { React, useState, useRef } from "react";
import WebcamCapture from "../components/webcam.jsx";
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

    /**
     * @brief Upload the file to the server
     */
    const handleUpload = async () => {
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

        } catch(error) {
            console.log("Error while fetching: ", error);
        }
    };

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
                        <SingleFileUploader setShowImage={setShowImage} />
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
                        onCapture={(capturedImage) => {
                            setImage(capturedImage);
                            setIsTakingPhoto(false); // Permitir que la imagen permanezca
                        }}
                        onCancel={() => {
                            setIsTakingPhoto(false);
                            setImage(null); // Reiniciar la imagen al cancelar
                        }}
                    />
                ) : (
                    image &&
                    !isConfirmed && ( // Solo mostrar si la imagen no ha sido confirmada
                        <div
                            className="webcam-container"
                            style={{ textAlign: "center" }}
                        >
                            <h2>Imagen capturada:</h2>
                            <img
                                src={image}
                                alt="Captured"
                                style={{
                                    width: "100%",
                                    maxWidth: "400px",
                                    borderRadius: "10px",
                                }}
                            />
                            <button
                                className="Button"
                                onClick={() => setIsConfirmed(true)}
                            >
                                Confirmar
                            </button>
                            <button
                                className="Button"
                                onClick={() => {
                                    setImage(null); // Reiniciar la imagen al cancelar
                                    setIsConfirmed(false); // Reiniciar confirmación
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    )
                )}
                {/* Mostrar mensaje si la imagen ha sido confirmada */}
                {isConfirmed && (
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
                        <p>La imagen ha sido confirmada.</p>
                    </div>
                )}
            </main>
        </>
    );
}

export default Scan;
