import React, { useState, useRef } from 'react'
import ApiManager from '../../modules/ApiManager'

import UserCard from './UserCard'

const UserSearch = props => {
    const [searchedUsers, setSearched] = useState([])
    const [currentUser] = localStorage.getItem("currUserId")

    const searchedName = useRef()

    const didUpdate = () => {
        setSearched([])
        props.updated(true)
    }


    const findUser = () => {
        const searched = searchedName.current.value.toLowerCase()
        //will only search users if the user enters something in the input
        if (searched !== "") {
            ApiManager.getAll("users", "_embed=follows")
                .then(allUsers => {
                    const filteredUsers = allUsers.filter(user => {
                        // concats first and last name into one string and converts it to lower case
                        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
                        // if the user's full name includes what was searched for return that user

                        return fullName.includes(searched)
                    })

                    setSearched(filteredUsers)
                })
        } else {
            setSearched([])
        }
    }

    const followUser = (id, publicProfile) => {
        // if a user wants to follow a user, create a data point in the follows resource. 
        // if publicProfile = true then pending = false
        // if publicProfile = false then pending = true

        const followObj = {
            currentUserId: Number(currentUser),
            userId: id,
            pending: !publicProfile
        }

        ApiManager.post("follows", followObj)
        .then(didUpdate)

    }
    
    const unfollowUser = (id) => {
        props.deleteFollow(id, didUpdate)
        
    }
    

    return (
        <>
            <h2>Find Users</h2>

            <input type="text" ref={searchedName} placeholder="Search for a user" />
            <button onClick={findUser}>Search</button>

            <div>
                {
                    searchedUsers.map(user => <UserCard key={user.id} user={user} followUser={followUser} unfollowUser={unfollowUser}/>)
                }
            </div>
        </>
    )

}

export default UserSearch
