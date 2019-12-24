import React from "react"
import {Route} from 'react-router-dom'
import NavBar from "./nav/NavBar"



const StitchIt = () => {


    return (
        <>
        <Route render={props => (
            <NavBar {...props} />
        )} />
            <h2>Stitch It</h2>

        </>
    )
}

export default StitchIt