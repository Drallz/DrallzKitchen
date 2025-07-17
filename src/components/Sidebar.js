import { Link } from 'react-router-dom';

export default function Sidebar({ visible, toggleSidebar }) {
    return (
        <div className={`sidebar ${visible ? 'visible' : 'hidden'}`}>
            <div className="sidebar-content">
                <Link to="/" onClick={toggleSidebar}>Home</Link>
                <Link to="/recipes" onClick={toggleSidebar}>Recipes</Link>
                <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
            </div>
        </div>
    );
}