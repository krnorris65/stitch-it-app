import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'
import useSimpleAuth from '../hooks/ui/useSimpleAuth'

import Home from './home/Home'
import DesignForm from './design/DesignForm'
import UserHome from './user/UserHome'

import { FabricProvider } from "./providers/FabricProvider"
import { SizeProvider } from "./providers/SizeProvider"
import { DesignProvider } from "./providers/DesignProvider"
import { UserProvider } from "./providers/UserProvider"



const ApplicationViews = props => {
    const { isAuthenticated } = useSimpleAuth()
    return (
        <div id="app-container">
            <Route exact path="/" render={props => {
                return <Home {...props} />
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
            {
                (isAuthenticated()) ?
                    <>
                        <DesignProvider>
                            <FabricProvider>
                                <SizeProvider>
                                    <Route path="/design/new" render={props => {
                                        if (isAuthenticated()) {
                                            return <DesignForm {...props} />
                                        }
                                    }} />

                                    <Route path="/design/edit/:designId(\d+)" render={props => {
                                        if (isAuthenticated()) {
                                            return <DesignForm {...props} />
                                        }
                                    }} />
                                </SizeProvider>
                            </FabricProvider>
                        </DesignProvider>

                        {/* <UserProvider> */}
                            {/* <DesignProvider> */}
                                <Route path="/following/:userId(\d)" render={props => {
                                    if (isAuthenticated()) {
                                        return <UserHome {...props} />
                                    }
                                }} />

                                {/* <Route path="/following/designs/:userId(\d)" render={props => {
                                    if (isAuthenticated()) {
                                        return <UserHome {...props} />
                                    }
                                }} /> */}
                            {/* </DesignProvider> */}
                        {/* </UserProvider> */}
                    </>
                    : null
            }
        </div>
    )
}

export default ApplicationViews