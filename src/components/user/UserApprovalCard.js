import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'


const UserApprovalCard = props => {
    const { deleteFollow, approveFollow} = useContext(UserContext)



    return (
        <div className="card">
            <div className="card-content">
                <h4>{props.followRequest.user.firstName} {props.followRequest.user.lastName}</h4>

                <button onClick={() => approveFollow(props.followRequest.id)}>Approve</button>
                <button onClick={() => deleteFollow(props.followRequest.id)}>Decline</button>



            </div>
        </div>
    )
}

export default UserApprovalCard