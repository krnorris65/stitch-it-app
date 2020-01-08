import React, { useState, useEffect } from 'react'


const UserCard = props => {
    const [currentUser] = localStorage.getItem("currUserId")
    const [followedStatus, setFollowedStatus] = useState(false)
    const [followPending, setPendingStatus] = useState(false)
    //when updating the follow status this will hold the needed id
    const [followId, setFollowId] = useState()

    const currentlyFollowed = () => {
        //logic used for when a user searches for users
        if (props.user.follows) {
            const ifCurrUserFollows = props.user.follows.filter(follow => follow.currentUserId === Number(currentUser))

            if (ifCurrUserFollows.length > 0) {
                const followObj = ifCurrUserFollows[0]
                setFollowedStatus(true)
                setPendingStatus(followObj.pending)
                setFollowId(followObj.id)
            }
        }
    }

    const pendingApproval = () => {
        //logic used for the users that are followed or the user still needs to approve their follow request
        if (props.followObj !== undefined) {

            if (!props.followObj.pending) {
                setFollowedStatus(true)
            }
            setPendingStatus(props.followObj.pending)
            setFollowId(props.followObj.id)
        }
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
                            <button>Unfollow</button>
                            // if the current user has requested to follow the user but it hasn't been approved
                            : (followedStatus && followPending) ?
                                <button>Delete Follow Request</button>
                                // if the current user needs to approve any follow requests from other users
                                : (!followedStatus && followPending) ?
                                    <>
                                        <button onClick={() => props.approveFollow(props.followObj)}>Approve</button>
                                        <button>Decline</button>
                                    </>
                                    // if the current user isn't following the user and the user's profile is public
                                    : (props.user.publicProfile) ?
                                        <button onClick={() => props.followUser(props.user.id)}>Follow</button>
                                        // if the current user isn't following the user and the user's profile is private
                                        : <button onClick={() => props.followUser(props.user.id)}>Request to Follow</button>
                }


            </div>
        </div>
    )
}

export default UserCard