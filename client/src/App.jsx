import React from "react";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Results from "./pages/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./styles/js/Footer";
import Header from "./styles/js/Header";

function App() {
    return (
        <>
            <BrowserRouter>
              <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/scan" element={<Scan />} />
                    <Route path="/results" element={<Results />}/>
                </Routes>
            </BrowserRouter>

            <Footer /> {/* Add footer to every route */}
        </>
    );
}

export default App;
