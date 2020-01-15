import React, { useState, useRef, useContext } from 'react'
import UserCard from './UserCard'
import {UserContext} from '../providers/UserProvider'

const UserSearch = props => {

    const {searchResults, findUsers} = useContext(UserContext)
    

    const searchedName = useRef()

    const submitSearch = () => {
        const searched = searchedName.current.value.toLowerCase()
        //will only search users if the user enters something in the input
        findUsers(searched)
        searchedName.current.value = ""

    }

    

    return (
        <>
            <h2>Find Users</h2>

            <input id="searchInput" type="text" ref={searchedName} placeholder="Search for a user" />
            <button onClick={submitSearch}>Search</button>

            <div>
                {
                    searchResults.map(user => <UserCard key={user.id} user={user}/>)
                }
            </div>
        </>
    )

}

export default UserSearch
