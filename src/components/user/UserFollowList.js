import React, { useContext } from 'react'
import UserCard from './UserCard'
import { UserContext } from '../providers/UserProvider'

const UserFollowList = props => {
    const { followedUsers } = useContext(UserContext)

    console.log(followedUsers)

    return (
        <>
            <h2>Following</h2>
            <div className="container-cards">
                {followedUsers.map(followObj => <UserCard key={followObj.id} stitcher={followObj.stitcher} followObj={followObj} {...props} />)}
            </div>
        </>
    )
}

export default UserFollowList
