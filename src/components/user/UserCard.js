import React, {useState, useEffect} from 'react'


const UserCard = props => {
    const [currentUser] = localStorage.getItem("currUserId")
    const [followedStatus, setFollowedStatus] = useState(false)
    const [followPending, setPendingStatus] = useState(false)

    const currentlyFollowed =() => {
        const ifCurrUserFollows = props.user.follows.filter(follow => follow.currentUserId === Number(currentUser))

        if(ifCurrUserFollows.length > 0){
            const followObj = ifCurrUserFollows[0]
            setFollowedStatus(true)
            setPendingStatus(followObj.pending)
        } 
    }

    useEffect(currentlyFollowed, [])

    return (
        <div className="card">
            <div className="card-content">
    <h4>{props.user.firstName} {props.user.lastName}</h4>

                {
                    (props.user.publicProfile) ?
                        <button>Follow</button> :
                        <button>Request to Follow</button>
                }

                {
                    (Number(currentUser) === props.user.id) ?
                    <p>current user</p>
                    : (followedStatus && !followPending) ?
                    <p>following</p> 
                    : (followedStatus && followPending) ?
                    <p>follow pending needs to be approved by other user</p>
                    : <p>not following</p>
                }


            </div>
        </div>
    )
}

export default UserCard