import React from 'react'
import { Link } from "react-router-dom";
import './Footer.css';
const MenuBar = () => {
    return (
        <footer >
            <div className="footer">
                <ul>
                    <li><Link to="/AboutUs">About Us</Link></li>
                    <li><Link to="/Contact">Contact Us</Link></li>
                </ul>

              

                <p>&copy; HOSTEL AVAILABILITY PROJECT</p>
            </div>
        </footer>
    )
}

export default MenuBar;