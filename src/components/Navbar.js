import { useState } from "react"

export default function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false)

    return(
        <>
        <div className="navbar container">
            <a href="#!" className="logo">Drallz<span>Kit</span>Chen🍽️</a>

            <div className="nav-links">
                <a href="#!">Home</a>
                <a href="#!">Recipes</a>
                <a href="#!">Settings</a>

            </div>
            <div onClick={() => setShowSidebar(!showSidebar)} className={showSidebar ? "sidebar-btn" : "sidebar-btn active"}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>

            </div>
        </div>
        <Sidebar/>
        </>
    )
}