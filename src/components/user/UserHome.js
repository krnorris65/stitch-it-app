import React from 'react'

import SearchUser from './SearchUser'
import UserList from './UserList'





const UserHome = props => {
    return (
        <>
            <h2>User Home Page</h2>

            <SearchUser />
            <UserList />

        </>
    )
}

export default UserHome