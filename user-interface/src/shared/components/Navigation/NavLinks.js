import React from 'react'
import "./NavLinks.css"
import { NavLink } from "react-router-dom"

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li>
                <NavLinks to="/"></NavLinks>
            </li>
        </ul>
    )
}

export default NavLinks
