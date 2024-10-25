import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UploadPhoto from "./pages/UploadPhoto";

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPhoto />} />
      </Routes>
    </Router>
  )
}

export default App