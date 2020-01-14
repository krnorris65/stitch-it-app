import React from 'react'
import DesignList from '../design/DesignList'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'
import Login from '../auth/Login'

import {DesignProvider} from "../providers/DesignProvider"

import '../styles/DesignForm.css'
import '../styles/Main.css'


const Home = props => {
    const { isAuthenticated } = useSimpleAuth()
    return (
        <>
            <h2>Home Page of Stitch It</h2>
            {
                (isAuthenticated()) ?
                    <>
                        <DesignProvider>
                            <DesignList {...props} />
                        </DesignProvider>
                    </>
                    : <Login {...props} />
            }
        </>
    )
}

export default Home