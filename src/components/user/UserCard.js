import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import useFollowStatus from '../../hooks/ui/useFollowStatus'

import '../styles/UserCard.css'

const UserCard = props => {
    const [currentUser] = localStorage.getItem("currUserId")
    const [followedStatus, setFollowedStatus] = useState(false)
    //when updating the follow status this will hold the needed id
    const [followId, setFollowId] = useState()
    const { deleteFollow, followUser } = useContext(UserContext)
    const { findStatus } = useFollowStatus(props.stitcher)

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

        followUser(newFollow).then(followInfo => {
            if(!followInfo.pending){
                props.history.push(`/users/following/${followInfo.userId}/${followInfo.id}`)
            } else {
                props.history.push("/users/following")
            }
        })
    }

    const viewDesigns = (userInfo, followId) => {
        //pass the followId so that the user can unfollow
        console.log(userInfo)
        props.history.push(`/users/following/${userInfo.stitcher_id}/${followId}`)

    }

    const unfollowFromDesign = (followId) => {
        deleteFollow(followId)
            .then(() => props.history.push("/users/following"))
    }

    useEffect(updateStatusAndId, [])

    return (
        <div className="userCard">
            <div className="card-content">
                {
                    //showDesign is only passed in when the user card is populated due to props.match.params.userId > 0
                    (props.showDesign === true) ?
                        <>
                            <h2 className="userName">{props.stitcher.user.first_name} {props.stitcher.user.last_name}'s Designs</h2>
                            <button className="formBtn" onClick={() => unfollowFromDesign(props.match.params.followId)}>Unfollow</button>
                        </>
                        :
                        <>
                            <h3 className="userName">{props.stitcher.user.first_name} {props.stitcher.user.last_name}</h3>

                            {
                                // conditional that checks if the user is the one that's logged in
                                (followedStatus === "current") ?
                                    <button className="formBtn" onClick={() => props.history.push("/")}>My Designs</button>
                                    // if the current user is currently following the user
                                    // if the current user isn't following the user and the user's profile is public
                                    : (followedStatus === "following") ?
                                        <>
                                            <button className="formBtn" onClick={() => viewDesigns(props.followObj, followId)}>View Designs</button>
                                        </>
                                        // if the current user has requested to follow the user but it hasn't been approved
                                        : (followedStatus === "pending") ?
                                            <button className="formBtn" onClick={() => deleteFollow(followId)}>Delete Follow Request</button>
                                            : (props.stitcher.public_profile) ?
                                                <button className="formBtn" onClick={() => submitFollow(props.user.id, props.stitcher.public_profile)}>Follow</button>
                                                // if the current user isn't following the user and the user's profile is private
                                                : <button className="formBtn" onClick={() => submitFollow(props.user.id, props.stitcher.public_profile)}>Request to Follow</button>
                            }
                        </>
                }


            </div>
        </div>
    )
}

export default UserCard