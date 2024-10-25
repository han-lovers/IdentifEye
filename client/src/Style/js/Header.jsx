import React, { useState } from 'react';
import "../css/Header.css";
import Logo from "../../assets/icon/liverpool-logo.svg";

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
            <img src={Logo} width={250} height={50} alt="logo" />
            <div className="menu" onClick={handleMenuOpen}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            <ul className={`list ${menuOpen ? "open" : ""}`}>
                <li className="nav-item">
                    <div className="nav-text">Home</div>
                </li>
                <li className="nav-item">
                    <div className="nav-text">Scan</div>
                </li>
            </ul>
        </nav>
    );
};

export default Header;