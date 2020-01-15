import React, {useState} from 'react'

import UserSearch from './UserSearch'
import UserList from './UserList'
import UserFollowList from "./UserFollowList"
import UserUnapprovedList from "./UserUnapprovedList"
import ApiManager from '../../modules/ApiManager'


const UserHome = props => {
    const [updated, setUpdated] = useState(false)

    const followedUser = () => {
        setUpdated(!updated)
    }


    const deleteFollow = (id, method) => {
        //delete a data point in the follows resource
        //if user is currently following a user but wants to unfollow them
        //if a private user declines another user's follow request
        //if a user has a follow request for a private user and wants to delete the follow request before it's been approved or declined

        //method accepts the id of the follow to be deleted and the method that should run after the delete has been completed
        console.log("delete", id)
        console.log("method", method)
        ApiManager.delete("follows", id)
        .then(method)

    }

    console.log(updated)



    return (
        <>
            <h2>User Home Page</h2>

            <UserFollowList />
            <UserUnapprovedList/>

            <UserSearch deleteFollow={deleteFollow} followedUser={followedUser}/>
            <UserList deleteFollow={deleteFollow} update={updated}/>
            

        </>
    )
}

export default UserHome