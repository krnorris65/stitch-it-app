import React from 'react'

import UserSearch from './UserSearch'
import UserList from './UserList'


const UserHome = props => {

    const followUser = () => {
        // if a user wants to follow a user, create a data point in the follows resource. 
        // if their profile is public then pending = false
        // if their private is public then pending = true

    }

    const deleteFollow = () => {
        //delete a data point in the follows resource
        //if user is currently following a user but wants to unfollow them
        //if a private user declines another user's follow request
        //if a user has a follow request for a private user and wants to delete the follow request before it's been approved or declined

    }

    const approveFollow = () => {
        //if a user with a private profile approves a pending follow request, change pending to false
    }


    return (
        <>
            <h2>User Home Page</h2>

            <UserSearch />
            <UserList />

        </>
    )
}

export default UserHome