import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import WebcamCapture from "../components/webcam.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import typeImage from "../assets/icons/upload.png";
import "../styles/css/Scan.css";

function SingleFileUploader({
    setShowImage,
    setImage,
    setIsConfirmed,
    handleCancel,
    handleConfirm,
    setIsLoading,
    navigate,
}) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setShowImage(false);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setIsConfirmed(true); // Reset the left side of the screen
        setFile(null);
        setShowImage(true);

        const fromData = new FormData();
        fromData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: fromData,
            });
            const data = await response.json();

            handleConfirm(imageUrl);

            const parseAndExtract = (data) => {
                const result = {};

                for (const [key, value] of Object.entries(data)) {
                    const parsedArray = JSON.parse(value);

                    result[key] = parsedArray;
                }

                return result;
            };

            let parsedData = await parseAndExtract(data);

            const similarArr = parsedData.matching;
            const matchingArr = parsedData.similar;

            const matchingArrporfavor = matchingArr.pop();

            localStorage.setItem(
                "matching",
                JSON.stringify(matchingArrporfavor)
            );
            localStorage.setItem("similar", JSON.stringify(similarArr));
        } catch (error) {
            console.log("Error while fetching: ", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                navigate("/results");
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

    /**
     * @brief Make post request when taking a photo
     */
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
            // Intentar analizar la respuesta como JSON
            const data = await uploadResponse.json();
            handleConfirm(image);
            const parseAndExtract = (data) => {
                const result = {};

                for (const [key, value] of Object.entries(data)) {
                    const parsedArray = JSON.parse(value);

                    result[key] = parsedArray;
                }

                return result;
            };

            let parsedData = await parseAndExtract(data);

            const similarArr = parsedData.matching;
            const matchingArr = parsedData.similar;

            const matchingArrporfavor = matchingArr.pop();

            localStorage.setItem(
                "matching",
                JSON.stringify(matchingArrporfavor)
            );
            localStorage.setItem("similar", JSON.stringify(similarArr));
            console.log(data);
        } catch (error) {
            console.error("Error al subir la imagen: ", error);
        }
    };

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
                                ref={uploadFile} // Attach the ref here
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
