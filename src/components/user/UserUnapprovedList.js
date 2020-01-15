import React, {useContext} from 'react'
import UserCard from './UserCard'
import {UserContext} from '../providers/UserProvider'

const UserUnapprovedList = props => {
    const {unapprovedUsers} = useContext(UserContext)


    return (
        <>
        <h2>Reply To These Requests</h2>
            <div className="container-cards">
                {unapprovedUsers.map(unapprovedObj => <UserCard key={unapprovedObj.id} user={unapprovedObj.requestingUser} followObj={unapprovedObj} />)}
            </div>
        </>
    )
}

export default UserUnapprovedList