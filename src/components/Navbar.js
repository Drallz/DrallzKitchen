import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
    return (
        <div className="navbar container">
            <Link to="/" className="logo">Drallz<span>Kit</span>Chen🍽️</Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/settings">Settings</Link>
            </div>
            
            <div onClick={toggleSidebar} className="sidebar-btn">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
    );
}