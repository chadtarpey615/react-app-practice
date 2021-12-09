import React from 'react'
import "../styles/Navbar.css"
const Navbar = () => {
    return (
        <nav>
            <ul className="navbar-left">
                <li>Home</li>
                <li>Log In</li>
            </ul>
            <ul className="navbar-right">
                <li>About</li>
                <li>Books</li>
            </ul>
        </nav>
    )
}

export default Navbar
