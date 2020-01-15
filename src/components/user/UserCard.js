import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../providers/UserProvider'


const UserCard = props => {
    const [currentUser] = localStorage.getItem("currUserId")
    const [followedStatus, setFollowedStatus] = useState(false)
    const [followPending, setPendingStatus] = useState(false)
    //when updating the follow status this will hold the needed id
    const [followId, setFollowId] = useState()

    const {deleteFollow, approveFollow, followUser} = useContext(UserContext)

    const currentlyFollowed = () => {
        //logic used for when a user searches for users
        if (props.user.follows) {
            const doesFollow = props.user.follows.find(follow => follow.currentUserId === Number(currentUser))
            console.log("find if followed", doesFollow)
            if (doesFollow !== undefined) {
                const followObj = doesFollow
                setFollowedStatus(true)
                setPendingStatus(followObj.pending)
                setFollowId(followObj.id)
            }
        }
    }
    
    const pendingApproval = () => {
        // console.log("pending approval", props.user)
        //logic used for the users that are followed or the user still needs to approve their follow request
        if (props.followObj !== undefined) {

            if (!props.followObj.pending) {
                setFollowedStatus(true)
            }
            setPendingStatus(props.followObj.pending)
            setFollowId(props.followObj.id)
        }
    }

    const submitFollow = (id, publicProfile) => {
        const followObj = {
            currentUserId: Number(currentUser),
            userId: id,
            pending: !publicProfile
        }

        followUser(followObj)
    }

    useEffect(currentlyFollowed, [])
    useEffect(pendingApproval, [])

    return (
        <div className="card">
            <div className="card-content">
                <h4>{props.user.firstName} {props.user.lastName}</h4>

                {
                    // conditional that checks if the user is the one that's logged in
                    (Number(currentUser) === props.user.id) ?
                        <p>current user</p>
                        // if the current user is currently following the user
                        : (followedStatus && !followPending) ?
                            <button onClick={() => deleteFollow(followId)}>Unfollow</button>
                            // if the current user has requested to follow the user but it hasn't been approved
                            : (followedStatus && followPending) ?
                                <button onClick={() => deleteFollow(followId)}>Delete Follow Request</button>
                                // if the current user needs to approve any follow requests from other users
                                : (!followedStatus && followPending) ?
                                    <>
                                        <button onClick={() => approveFollow(followId)}>Approve</button>
                                        <button onClick={() => deleteFollow(followId)}>Decline</button>
                                    </>
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