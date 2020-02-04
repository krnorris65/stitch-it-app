import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import useFollowStatus from '../../hooks/ui/useFollowStatus'

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';

const UserCard = props => {
    const [currentUser] = localStorage.getItem("currUserId")
    const [followedStatus, setFollowedStatus] = useState(false)
    //when updating the follow status this will hold the needed id
    const [followId, setFollowId] = useState()

    const { deleteFollow, followUser } = useContext(UserContext)

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

    const viewDesigns = (userInfo, followId) => {
        //pass the followId so that the user can unfollow
        userInfo.followId = followId
        props.history.push({
            pathname: `/following/designs/${userInfo.id}`,
            state: userInfo
        })
    }

    useEffect(updateStatusAndId, [])



    return (
        <div className="card">
            <div className="card-content">
                <h4 className="userName">{props.user.firstName} {props.user.lastName}</h4>

                {
                    // conditional that checks if the user is the one that's logged in

                    (followedStatus === "current") ?
                        <PersonIcon className="userIcon" onClick={() => props.history.push("/")} />
                        // if the current user is currently following the user
                        // if the current user isn't following the user and the user's profile is public
                        : (followedStatus === "following") ?
                            <>
                                {/* <button onClick={() => viewDesigns(props.user, followId)}>View Profile</button> */}
                                <AccountBoxIcon className="userIcon" onClick={() => viewDesigns(props.user, followId)} />
                                {/* <button onClick={() => deleteFollow(followId)}>Unfollow</button> */}
                            </>
                            // if the current user has requested to follow the user but it hasn't been approved
                            : (followedStatus === "pending") ?
                                <button onClick={() => deleteFollow(followId)}>Delete Follow Request</button>
                                : (props.user.publicProfile) ?
                                    // <button onClick={() => submitFollow(props.user.id, props.user.publicProfile)}>Follow</button>
                                    <PersonAddIcon className="userIcon" onClick={() => submitFollow(props.user.id, props.user.publicProfile)} />
                                    // if the current user isn't following the user and the user's profile is private
                                    : <button onClick={() => submitFollow(props.user.id, props.user.publicProfile)}>Request to Follow</button>
                }


            </div>
        </div>
    )
}

export default UserCard