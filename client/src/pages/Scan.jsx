// Scan.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WebcamCapture from "../components/webcam.jsx";
import typeImage from "../assets/icons/upload.png";
import "../styles/css/Scan.css";
import LoadingScreen from "../components/LoadingScreen";
import PropTypes from 'prop-types';

function SingleFileUploader({ setShowImage, setImage, setIsConfirmed, handleCancel, handleConfirm, setIsLoading, navigate }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setShowImage(false);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        console.log("Setting isLoading to true");
        setIsLoading(true); // Show loading screen
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setIsConfirmed(true);
        setFile(null);
        setShowImage(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            console.log("Message: ", data.message);
            console.log("File path: ", data.file_path);

            handleConfirm(imageUrl);
        } catch (error) {
            console.error("Error while fetching: ", error);
        } finally {
            console.log("Esperando 20 segundos antes de redirigir...");
            setTimeout(() => {
                setIsLoading(false); // Hide loading screen
                navigate("/Results"); // Redirect to /Results after 20 seconds
            }, 20000);
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

SingleFileUploader.propTypes = {
    setShowImage: PropTypes.func.isRequired,
    setImage: PropTypes.func.isRequired,
    setIsConfirmed: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
};

function Scan() {
    const [showOptions, setShowOptions] = useState(false);
    const [isTakingPhoto, setIsTakingPhoto] = useState(false);
    const [image, setImage] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showUploadButton, setShowUploadButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const uploadFile = useRef(null);
    const navigate = useNavigate();

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
                const errorText = await uploadResponse.text(); // Get response text
                console.error("Error response: ", errorText);
                throw new Error(`Upload error: ${uploadResponse.status} ${errorText}`);
            }

            // Try to parse the response as JSON
            const data = await uploadResponse.json();
            console.log("Upload response: ", data);
        } catch (error) {
            console.error("Error uploading image: ", error);
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
            {isLoading ? (
                <LoadingScreen />
            ) : (
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
                                handleConfirm={handleConfirm} // Pass handleConfirm to SingleFileUploader
                                setIsLoading={setIsLoading} // Pass setIsLoading to SingleFileUploader
                                navigate={navigate} // Pass navigate to SingleFileUploader
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
                            setIsLoading={setIsLoading} // Pass setIsLoading to WebcamCapture
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
            )}
        </>
    );
}

export default Scan;