import React from "react";
import typeImage from './assets/images/upload.png';

import './App.css'

function App() {

  return (
    <>
      <div>
        <main>
          <div className='card'>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <p> <strong>Upload your image</strong> </p>
          <button className="Button"> Submit </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default App