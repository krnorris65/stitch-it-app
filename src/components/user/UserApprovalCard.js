import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'


const UserApprovalCard = props => {
    const { deleteFollow, approveFollow } = useContext(UserContext)

    return (
        <div className="userCard">
            <div className="card-content">
                <h4>{props.followRequest.follower.user.first_name} {props.followRequest.follower.user.last_name}</h4>

                <div className="button-container">
                    <button className="formBtn" onClick={() => approveFollow(props.followRequest.id)}>Approve</button>
                    <button className="formBtn" onClick={() => deleteFollow(props.followRequest.id)}>Decline</button>
                </div>



            </div>
        </div>
    )
}

export default UserApprovalCard