import { useState, useRef } from "react";
import WebcamCapture from "../components/webcam.jsx";
import typeImage from "../assets/icons/upload.png";
import "../styles/css/Scan.css";

function SingleFileUploader({ setShowImage, setImage, setIsConfirmed, handleCancel }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setShowImage(false);
        }
    };

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
    const [image, setImage] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showUploadButton, setShowUploadButton] = useState(false);
    const uploadFile = useRef(null);

    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    };

    const [showFile, setShowFile] = useState(false);
    const [showImage, setShowImage] = useState(true);

    const handleUploadPhoto = () => {
        setShowFile(true);
        setShowImage(false);
        setShowOptions(false);
        if (uploadFile.current) {
            uploadFile.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleCancel = () => {
        setShowFile(false);
        setShowImage(true);
        setShowOptions(false);
        setImage(null);
        setIsConfirmed(false);
        setIsTakingPhoto(false);
        setShowUploadButton(false);
    };


    const handleUploadConfirmedImage = async (capturedImage) => {
        const formData = new FormData();
        try {
            const response = await fetch(capturedImage);
            const blob = await response.blob(); // Convert image src to blob
            formData.append("file", blob, "capturedImage.jpg"); // Add the image to formData

            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            console.log("Response Status: ", uploadResponse.status);
            console.log("Response Headers: ", uploadResponse.headers);

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text(); // Obtener el texto de la respuesta
                console.error("Error response: ", errorText);
                throw new Error(`Error en la subida: ${uploadResponse.status} ${errorText}`);
            }

            // Intentar analizar la respuesta como JSON
            const data = await uploadResponse.json();
            console.log("Respuesta de la subida: ", data);
        } catch (error) {
            console.error("Error al subir la imagen: ", error);
        }
    }

    const handleConfirm = (capturedImage) => {
        setImage(capturedImage);
        setIsTakingPhoto(false);
        setIsConfirmed(true);
        setShowFile(false);
        setShowImage(true);
        setShowOptions(false);
        setShowUploadButton(true);
        handleUploadConfirmedImage(capturedImage); // Call the upload function here
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

                {isTakingPhoto ? (
                    <WebcamCapture
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                        handleUpload={handleUploadConfirmedImage}
                    />
                ) : (
                    image &&
                    isConfirmed && (
                        <div
                            className="webcam-container"
                            style={{ textAlign: "center" }}
                            ref={uploadFile}  // Attach the ref here
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
