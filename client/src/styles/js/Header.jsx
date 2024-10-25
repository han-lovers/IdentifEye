import  { React, useState } from 'react';
import { Link } from "react-router-dom";
import "../css/Header.css";
import Logo from "../../assets/icons/liverpool-logo.svg";

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
        <>
            <nav className="nav-bar">
                <img src={Logo} width={250} height={50} alt="logo" />
                <div className="menu" onClick={handleMenuOpen}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
                <ul className={`list ${menuOpen ? "open" : ""}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-text">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/scan" className="nav-text">
                            Scan
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;