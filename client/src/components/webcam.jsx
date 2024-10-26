import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import "../styles/css/webcam.css";

const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT
};

const WebcamCapture = ({ onCancel, onConfirm }) => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    }, [webcamRef]);

    return (
        <div className="webcam-container">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={{width:"100%"}}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Tomar foto</button>
            <button onClick={onCancel}>Cancelar</button>
            {capturedImage && (
                <>
                    <img src={capturedImage} alt="Captured" className="captured-image" />
                    <button onClick={() => onConfirm(capturedImage)}>Confirm</button>
                </>
            )}
        </div>
    );
};

WebcamCapture.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default WebcamCapture;