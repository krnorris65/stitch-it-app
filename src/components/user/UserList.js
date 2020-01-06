import React, { useState, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'
import UserCard from './UserCard'

const UserList = props => {
    const [currentUser] = localStorage.getItem("currUserId")
    const [following, setFollowing] = useState([])
    const [unapproved, setUnapproved] = useState([])


    const getFollowedUsers = () => {
        ApiManager.getAll("follows", `currentUserId=${currentUser}&pending=false`)
            .then(followedUsers => setFollowing(followedUsers))
    }


    const getUnapprovedRequests = () => {
        //use asyc/await and Promise.all so that it waits until all the individual fetch requests are complete before setting state of unapproved
        ApiManager.getAll("follows", `userId=${currentUser}&pending=true`)
            .then(async unapprovedReq => {
                await Promise.all(
                    unapprovedReq.map(async requestObj => {
                        await ApiManager.getOne("users", requestObj.currentUserId)
                            .then(userInfo => requestObj.requestingUser = userInfo)
                    })
                )
                setUnapproved(unapprovedReq)
                
            })
    }

    const approveFollow = obj => {
        obj.pending = false
        console.log(obj)
        // ApiManager.update("follows", obj)

    }


    useEffect(getFollowedUsers, [])
    useEffect(getUnapprovedRequests, [])


    return (
        <>
            <h2>Following</h2>
            {
                following.map(followObj => <UserCard key={followObj.id} user={followObj.user} followObj={followObj}/>)
            }

            <h2>Unapproved Requests</h2>
            {
                unapproved.map(unapprovedObj => <UserCard key={unapprovedObj.id} user={unapprovedObj.requestingUser} followObj={unapprovedObj} approveFollow={approveFollow}/>)
            }
        </>
    )
}

export default UserList