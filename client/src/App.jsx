import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./styles/js/Footer";
import Header from "./styles/js/Header";

function App() {
    return (
        <>
            <Header /> {/* Add header to every route */}

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>

            <Footer /> {/* Add footer to every route */}
        </>
    );
}

export default App;
