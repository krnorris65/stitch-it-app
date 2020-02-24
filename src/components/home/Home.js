import React from 'react'
import DesignList from '../design/DesignList'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'
import Login from '../auth/Login'

import { DesignProvider } from "../providers/DesignProvider"


const Home = props => {
    const { isAuthenticated } = useSimpleAuth()
    return (
        <>
            {
                (isAuthenticated()) ?
                    <>
                        <h2>My Designs</h2>
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