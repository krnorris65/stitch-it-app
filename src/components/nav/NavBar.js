import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()

    const handleLogout = () => {
        logout()
        props.history.push("/")
    }

    return (
        <nav>
            <ul className="container">
                <li> <Link className="nav-link" to="/">Home</Link></li>
                {isAuthenticated() ?
                    <>
                        <li>Designs</li>
                        <li>Messages</li>
                        <li><span onClick={handleLogout}>Logout</span></li>
                    </>
                    :
                    <>
                        <li> <Link className="nav-link" to="/login">Login</Link></li>
                        <li> <Link className="nav-link" to="/register">Register</Link></li>
                    </>
                }
            </ul>

        </nav>
    )
}

export default NavBar