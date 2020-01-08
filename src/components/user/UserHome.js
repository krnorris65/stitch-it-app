import React from 'react'

import UserSearch from './UserSearch'
import UserList from './UserList'


const UserHome = props => {



    const deleteFollow = (id, method) => {
        //delete a data point in the follows resource
        //if user is currently following a user but wants to unfollow them
        //if a private user declines another user's follow request
        //if a user has a follow request for a private user and wants to delete the follow request before it's been approved or declined
        console.log("delete", id)
        console.log("method", method())

    }



    return (
        <>
            <h2>User Home Page</h2>

            <UserSearch deleteFollow={deleteFollow}/>
            <UserList deleteFollow={deleteFollow}/>

        </>
    )
}

export default UserHome