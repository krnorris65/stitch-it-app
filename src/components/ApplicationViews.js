import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'
import useSimpleAuth from '../hooks/ui/useSimpleAuth'

import Home from './home/Home'
import DesignForm from './design/DesignForm'


const ApplicationViews = props => {
    const { isAuthenticated } = useSimpleAuth()
    return (
        <>
            <Route exact path="/" render={props => {
                return <Home />
            }} />

            {/* if the user is already logged in they they will not be able to access the login or register pages */}
            <Route path="/login" render={props => {
                if (!isAuthenticated()) {
                    return <Login {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }} />
            <Route path="/register" render={props => {
                if (!isAuthenticated()) {
                    return <Register {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }} />

            <Route path="/design/new" render={props => {
                if(isAuthenticated()) {
                    return <DesignForm />
                }
            }} />
        </>
    )
}

export default ApplicationViews