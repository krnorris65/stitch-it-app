import React from 'react'

import UserSearch from './UserSearch'
import UserFollowList from "./UserFollowList"
import UserUnapprovedList from "./UserUnapprovedList"


const UserHome = props => {

    return (
        <>
            <h2>User Home Page</h2>

            <UserFollowList />
            <UserUnapprovedList/>

            <UserSearch/>
            
        </>
    )
}

export default UserHome