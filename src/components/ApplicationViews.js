import React from 'react'
import { Route, Redirect } from 'react-router-dom'

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

            <Route path="/users/search" render={props => {
                if (isAuthenticated()) {
                    return <UserProvider>
                        <UserHome {...props} />
                    </UserProvider>
                } else {
                    return <Redirect to="/" />
                }
            }} />
            <Route exact path="/users/following" render={props => {
                if (isAuthenticated()) {
                    return <UserProvider>
                        <UserHome {...props} />
                    </UserProvider>
                } else {
                    return <Redirect to="/" />
                }
            }} />
            <Route path="/users/following/:userId/:followId" render={props => {
                if (isAuthenticated()) {
                    return <UserProvider>
                        <UserHome {...props} />
                    </UserProvider>
                } else {
                    return <Redirect to="/" />
                }
            }} />
            <Route path="/users/pending" render={props => {
                if (isAuthenticated()) {
                    return <UserProvider>
                        <UserHome {...props} />
                    </UserProvider>
                } else {
                    return <Redirect to="/" />
                }
            }} />

            {/* if the user is already logged in they they will not be able to access the login or register pages */}

            <Route path="/register" render={props => {
                if (!isAuthenticated()) {
                    return <Register {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }} />

            <FabricProvider>
                <SizeProvider>
                    <Route path="/design/new" render={props => {
                        if (isAuthenticated()) {
                            console.log(isAuthenticated())
                            return <DesignProvider>
                                <DesignForm {...props} />
                            </DesignProvider>
                        } else {
                            return <Redirect to="/" />
                        }
                    }} />

                    <Route path="/design/edit/:designId(\d+)" render={props => {
                        if (isAuthenticated()) {
                            return <DesignProvider>
                                <DesignForm {...props} />
                            </DesignProvider>
                        } else {
                            return <Redirect to="/" />
                        }
                    }} />
                </SizeProvider>
            </FabricProvider>


        </div>
    )
}

export default ApplicationViews