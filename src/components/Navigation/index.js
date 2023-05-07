// ./components/Navigation.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navigation.scss";
import { destroyToken, getToken, getUserDetails } from "../../utils/token";
import imgsrc from "./logo.png";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, credits] = getUserDetails();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const token = getToken();

  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/">
          <img src={imgsrc} alt="Auction house logo" tabIndex={0} width="70" height="70" />
        </Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/auctions" onClick={toggleMenu}>
            Auctions
          </Link>
        </li>

        {token?.length > 0 ? (
          <>
            <li>
              <Link to="/profiles">Profiles</Link>
            </li>
            <li>
              <Link to={"/profiles/" + userName}>My Profile</Link>
            </li>
            <div>{credits}</div>
            <li>
              <Link
                to="/"
                onClick={() => {
                  destroyToken();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" onClick={toggleMenu}>
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
            </li>
          </>
        )}

        <li>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
