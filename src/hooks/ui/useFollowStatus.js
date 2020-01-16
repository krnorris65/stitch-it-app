import React, { useState, useContext } from 'react'
import { UserContext } from '../../components/providers/UserProvider'

const useFollowStatus = user => {
    const [currentUser] = localStorage.getItem("currUserId")

    const { followedUsers, unapprovedUsers, pendingRequests } = useContext(UserContext)

    //status types
    // current - user is the current user
    // following - user is followed by the current user 
    // notFollowing - user is not followed by the current user
    // pending - user has private profile and has not approved current users follow request


    const findStatus = () => {
        // console.log("follow hook user", user)
        //checks to see if the user is followed by the current user
        const found = followedUsers.find(followInfo => followInfo.userId === user.id)

        //checks to see if the user has an unresolved follow request from the current user
        const pending = pendingRequests.find(pendingInfo => pendingInfo.userId === user.id)

        if (user.id === Number(currentUser)) {
            return "current"
        } else if (found !== undefined) {
            return "followed"
        } else if (pending !== undefined) {
            return "pending"
        } else {
            return "unfollowed"
        }

    }

        // unapproved - user sent current user a follow request and the current user hasn't approved (or declined) it yet
    const findUnapproved = () => {
        //checks to see if the user is in the list of followedUsers
        const unapproved = unapprovedUsers.find(unapprovedInfo => unapprovedInfo.currentUserId === user.id)
    }

    return { findStatus }
}

export default useFollowStatus