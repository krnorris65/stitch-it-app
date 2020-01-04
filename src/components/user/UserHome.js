import React from 'react'

import UserSearch from './UserSearch'
import UserList from './UserList'


const UserHome = props => {
    return (
        <>
            <h2>User Home Page</h2>

            <UserSearch />
            <UserList />

        </>
    )
}

export default UserHome