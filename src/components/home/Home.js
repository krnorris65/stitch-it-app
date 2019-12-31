import React from 'react'
import DesignList from '../design/DesignList'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'
import Login from '../auth/Login'


const Home = props => {
    const {isAuthenticated} = useSimpleAuth()
    return (
        <>
        <h2>Home Page of Stitch It</h2>
        {
            (isAuthenticated()) ? 
            <DesignList {...props}/>
            : <Login />
        }
        </>
    )
}

export default Home