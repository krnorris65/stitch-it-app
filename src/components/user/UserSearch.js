import React, {useRef, useContext, useEffect } from 'react'
import UserCard from './UserCard'
import {UserContext} from '../providers/UserProvider'


const UserSearch = props => {
    const {searchResults, findUsers} = useContext(UserContext)
    
    const searchedName = useRef()

    const submitSearch = () => {
        const searched = searchedName.current.value.toLowerCase()
        //will only search users if the user enters something in the input
        findUsers(searched)

        //reset value of search
        searchedName.current.value = ""
    }

    //when component unmounts, reset the searchResults
    useEffect(
        () => {
            return () => findUsers("")
        }, []
    )

    
    return (
        <>
            <h2>Search for Users</h2>

            <input id="searchInput" type="text" ref={searchedName} placeholder="Search for a user" />
            <button onClick={submitSearch}>Search</button>

            <div>
                {
                    searchResults.map(user => <UserCard key={user.id} user={user} {...props}/>)
                }
            </div>
        </>
    )

}

export default UserSearch
