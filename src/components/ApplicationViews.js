import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Login from '../components/auth/Login'
import Register from '../components/auth/Register'


const ApplicationViews = props => {
        return (
            <>
                <Route exact path="/" render={props => {
                    return <h2>Stitch It Home Page</h2>
                }} />

                <Route path="/login" render={props => {
                    return <Login {...props}/>
                }} />
                <Route path="/register" render={props => {
                    return <Register {...props}/>
                }} />
            </>
        )
}

export default ApplicationViews