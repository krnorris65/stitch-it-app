import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import useFollowStatus from '../../hooks/ui/useFollowStatus'

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
        sessionStorage.setItem("followedUser", JSON.stringify(userInfo))
        props.history.push(`/following/${userInfo.id}`)

    }

    const unfollowFromDesign = (followId) => {
        props.history.push("/following/0")
        deleteFollow(followId)
    }

    console.log("UserCare", props.user)

    useEffect(updateStatusAndId, [])

    return (
        <div className="userCard">
            <div className="card-content">
                {
                    //showDesign is only passed in when the user card is populated due to props.match.params.userId > 0
                    (props.showDesign === true) ?
                        <>
                            <h2>{props.user.firstName} {props.user.lastName}'s Designs</h2>
                            <button onClick={() => unfollowFromDesign(props.user.followId)}>Unfollow</button>
                        </>
                        :
                        <>
                            <h4 className="userName">{props.user.firstName} {props.user.lastName}</h4>

                            {
                                // conditional that checks if the user is the one that's logged in
                                (followedStatus === "current") ?
                                    <PersonIcon className="userIcon" onClick={() => props.history.push("/")} />
                                    // if the current user is currently following the user
                                    // if the current user isn't following the user and the user's profile is public
                                    : (followedStatus === "following") ?
                                        <>
                                            <button onClick={() => viewDesigns(props.user, followId)}>View Profile</button>
                                        </>
                                        // if the current user has requested to follow the user but it hasn't been approved
                                        : (followedStatus === "pending") ?
                                            <button onClick={() => deleteFollow(followId)}>Delete Follow Request</button>
                                            : (props.user.publicProfile) ?
                                                <button onClick={() => submitFollow(props.user.id, props.user.publicProfile)}>Follow</button>
                                                // if the current user isn't following the user and the user's profile is private
                                                : <button onClick={() => submitFollow(props.user.id, props.user.publicProfile)}>Request to Follow</button>
                            }
                        </>
                }


            </div>
        </div>
    )
}

export default UserCard