import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import useFollowStatus from '../../hooks/ui/useFollowStatus'


const UserCard = props => {
    const [currentUser] = localStorage.getItem("currUserId")
    const [followedStatus, setFollowedStatus] = useState(false)
    //when updating the follow status this will hold the needed id
    const [followId, setFollowId] = useState()

    const { deleteFollow, approveFollow, followUser } = useContext(UserContext)

    const { findStatus } = useFollowStatus(props.user)

    const updateStatusAndId = () => {
        const statusInfo = findStatus()

        setFollowId(statusInfo.followId)
        setFollowedStatus(statusInfo.status)
    }


    const submitFollow = (id, publicProfile) => {
        const newFollow = {
            currentUserId: Number(currentUser),
            userId: id,
            pending: !publicProfile
        }

        followUser(newFollow)
    }

    useEffect(updateStatusAndId, [])


    return (
        <div className="card">
            <div className="card-content">
                <h4>{props.user.firstName} {props.user.lastName}</h4>

                {
                    // conditional that checks if the user is the one that's logged in
                    (followedStatus === "current") ?
                        <p>current user</p>
                        // if the current user is currently following the user
                        : (followedStatus === "following") ?
                            <button onClick={() => deleteFollow(followId)}>Unfollow</button>
                            // if the current user has requested to follow the user but it hasn't been approved
                            : (followedStatus === "pending") ?
                                <button onClick={() => deleteFollow(followId)}>Delete Follow Request</button>
                                // if the current user isn't following the user and the user's profile is public
                                : (props.user.publicProfile) ?
                                    <button onClick={() => submitFollow(props.user.id, props.user.publicProfile)}>Follow</button>
                                    // if the current user isn't following the user and the user's profile is private
                                    : <button onClick={() => submitFollow(props.user.id, props.user.publicProfile)}>Request to Follow</button>
                }


            </div>
        </div>
    )
}

export default UserCard