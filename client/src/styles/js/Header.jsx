import React, { useState } from 'react';
import "../css/Header.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showMenuItems, setShowMenuItems] = useState(false);

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
        if(!showMenuItems) {
            setShowMenuItems(true);
        }
        else {
            showMenuItems(false);
        }
    }

    return (
        <nav className="nav-bar">
            <div className="title">Fortnite pro</div>
            <div className="menu" onClick={handleMenuOpen}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            <ul className={`list ${menuOpen ? "open" : ""}`}>
                <li className="nav-item">
                    <div className="nav-text">Snoodytv</div>
                </li>
                <li className="nav-item">
                    <div className="nav-text">Varbi</div>
                </li>
                <li className="nav-item">
                    <div className="nav-text">Varbo</div>
                </li>
            </ul>
        </nav>
    );
};

export default Header;