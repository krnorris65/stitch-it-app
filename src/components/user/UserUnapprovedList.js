import React, {useContext} from 'react'
import UserApprovalCard from './UserApprovalCard'
// import UserCard from './UserCard'
import {UserContext} from '../providers/UserProvider'

const UserUnapprovedList = props => {
    const {unapprovedUsers} = useContext(UserContext)


    return (
        <>
        <h2>Reply To These Requests</h2>
            <div className="container-cards">
                {unapprovedUsers.map(followRequest => <UserApprovalCard key={followRequest.id} followRequest={followRequest}/>)}
            </div>

            {/* <h3>Testing</h3>
                {unapprovedUsers.map(followRequest => <UserCard key={followRequest.id} user={followRequest.user}/>)} */}
        </>
    )
}

export default UserUnapprovedList