import React, {useState, useEffect} from 'react'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import "../styles/NavBar.css"


const NavBar = props => {
    const { isAuthenticated, logout, currentUserInfo } = useSimpleAuth()
    const [firstName, setFirstName] = useState("")

    const handleLogout = () => {
        logout()
        props.history.push("/")
    }

    useEffect(() => {
        if(isAuthenticated()){
            currentUserInfo().then(info => setFirstName(info.user.first_name))
        }
    }, [isAuthenticated()])

    return (
        <nav>
            <Toolbar>
                <Typography variant="h6" onClick={() => props.history.push("/")}> <img id="logo" src={require('./needle.svg')} alt="logo"/></Typography>
                <Typography className="nav-link" variant="h6" onClick={() => props.history.push("/")}> Stitch It</Typography>
                {isAuthenticated() ?
                    <>
                        <Typography className="nav-link" variant="h6" onClick={() => props.history.push("/")}> My Designs</Typography>
                        <Typography className="nav-link" variant="h6" onClick={() => props.history.push("/users/following")}>Following</Typography>
                        {/* <Typography className="nav-link" variant="h6">Messages</Typography> */}
                        <Button color="inherit" onClick={handleLogout}>Logout {firstName}</Button>
                    </>
                    :
                    <>
                        <Button color="inherit" onClick={() => props.history.push("/")}>Login</Button>
                        <Button color="inherit" onClick={() => props.history.push("/register")}>Register</Button>
                    </>
                }
            </Toolbar>
        </nav>
    )
}

export default NavBar