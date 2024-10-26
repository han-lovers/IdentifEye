import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/css/webcam.css";

const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT
};

const WebcamCapture = ({ onCancel, onConfirm, handleUpload, setIsLoading }) => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const navigate = useNavigate();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    }, [webcamRef]);

    const confirmAndUpload = async () => {
        setIsLoading(true);
        onConfirm(capturedImage);
        await handleUpload(capturedImage);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/results");
        }, 20000);
    };

    return (
        <div className="webcam-container">
            <>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{width: "100%"}}
                    videoConstraints={videoConstraints}
                />
                <button onClick={capture}>Tomar foto</button>
                <button onClick={onCancel}>Cancelar</button>
                {capturedImage && (
                    <>
                        <img src={capturedImage} alt="Captured" className="captured-image"/>
                        <button onClick={confirmAndUpload}>Confirmar y subir</button>
                    </>
                )}
            </>
        </div>
    );
};

WebcamCapture.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired, // Add prop type for setIsLoading
};

export default WebcamCapture;