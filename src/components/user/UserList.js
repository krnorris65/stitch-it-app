import React, { useState, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'

const UserList = props => {
    const [currentUser] = localStorage.getItem("currUserId")
    const [following, setFollowing] = useState([])
    const [unapproved, setUnapproved] = useState([])


    const getFollowedUsers = () => {
        ApiManager.getAll("follows", `currentUserId=${currentUser}&pending=false`)
            .then(followedUsers => setFollowing(followedUsers))
    }

    const getUnapprovedRequests = () => {
        ApiManager.getAll("follows", `userId=${currentUser}&pending=true`)
            .then(unapprovedReq => {
                unapprovedReq.map(requestObj => {
                    ApiManager.getOne("users", requestObj.currentUserId)
                        .then(userInfo => {
                            requestObj.requesterInfo = userInfo
                        })
                })
                return unapprovedReq
            }).then(updatedInfo => setUnapproved(updatedInfo))
    }

    useEffect(getFollowedUsers, [])
    useEffect(getUnapprovedRequests, [])


    return (
        <h2>Following</h2>
    )
}

export default UserList