import React from "react";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Style/js/Footer";
import Header from "./Style/js/Header";

function App() {
    return (
        <>
            <Header /> {/* Add header to every route */}

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/scan" element={<Scan />} />
                </Routes>
            </BrowserRouter>

            <Footer /> {/* Add footer to every route */}
        </>
    );
}

export default App;