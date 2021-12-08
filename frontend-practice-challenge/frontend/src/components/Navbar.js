import React from 'react'

import "../styles/Navbar.css"
const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-left">
                <li>Home </li>
                <li>Sign In</li>
                <li>Sign Up</li>
            </ul>

            <ul className="navbar-right">
                <li>About</li>
                <li>Contact</li>
                <li>Post</li>
            </ul>
        </nav>
    )
}

export default Navbar
