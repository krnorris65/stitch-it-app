import React from "react"
import {Route} from 'react-router-dom'
import NavBar from "./nav/NavBar"
import ApplicationViews from './ApplicationViews'

import './styles/Main.css'



const StitchIt = () => {


    return (
        <>
        <Route render={props => (
            <NavBar {...props} />
        )} />
        <ApplicationViews/>
        </>
    )
}

export default StitchIt