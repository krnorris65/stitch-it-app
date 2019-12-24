import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

const NavBar = props => {
    return (
        <nav>
            <ul className="container">
                <li> <Link className="nav-link" to="/">Home</Link></li>
                <li>Designs</li>
                <li>Messages</li>
                <li>Login</li>
                <li>Register</li>
                <li>Logout</li>
            </ul>

        </nav>
    )
}

export default NavBar