import { React, useState, useRef } from "react";
import typeImage from "../assets/icon/upload.png";
import "../Style/css/Scan.css";

function SingleFileUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
};

const handleUpload = async () => {
  console.log("MATENME QUIERO HACER PIPI:");
};


return (
  <div className="subeFile">
    <div className="input">
      <input id="file" type="file" onChange={handleFileChange} />
    </div>
    {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

    {file && (
      <button 
        onClick={handleUpload}
        className="submit"
      > Submit </button>
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
    const uploadFile = useRef(null);

    const handleUploadPhoto = () => {
      setShowFile(true);
      setShowOptions(false);
      uploadFile.current.scrollIntoView({ behavior: "smooth" });
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
                            <button className="listButtonOption" onClick={handleUploadPhoto}>
                                {" "}
                                Upload a photo{" "}
                            </button>
                        </div>
                    )}
                </div>

                {showFile && (
                  <div ref={uploadFile}>
                    <SingleFileUploader />
                  </div>
                )}

            </main>
        </>
    );
}

export default Scan;