import React, { useContext } from 'react'
import UserCard from './UserCard'
import { UserContext } from '../providers/UserProvider'

const UserFollowList = props => {
    const { followedUsers } = useContext(UserContext)

    return (
        <>
        <h2>Following These Users</h2>

            <div className="container-cards">
                {followedUsers.map(followObj => <UserCard key={followObj.id} user={followObj.user} followObj={followObj} {...props}/>)}
            </div>
        </>
    )
}

export default UserFollowList
