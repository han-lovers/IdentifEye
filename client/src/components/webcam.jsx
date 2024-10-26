import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types"; // Importa PropTypes
import "../styles/css/webcam.css"; // Asegúrate de la ruta correcta

const WebcamCapture = ({ onCapture, onCancel }) => {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc); // Llama a la función pasada como prop
    }, [webcamRef, onCapture]);

    return (
        <div className="webcam-container">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={400} // Ajusta el tamaño según sea necesario
            />
            <button onClick={capture}>Tomar foto</button>
            <button onClick={onCancel}>Cancelar</button>
        </div>
    );
};

// Agrega la validación de props
WebcamCapture.propTypes = {
    onCapture: PropTypes.func.isRequired, // Asegúrate de que es una función y es requerida
    onCancel: PropTypes.func.isRequired,   // Asegúrate de que es una función y es requerida
};

export default WebcamCapture;