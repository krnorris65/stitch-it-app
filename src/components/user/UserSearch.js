import React, { useRef, useContext, useEffect } from 'react'
import UserCard from './UserCard'
import { UserContext } from '../providers/UserProvider'


const UserSearch = props => {
    const { searchResults, findUsers } = useContext(UserContext)

    const searchedName = useRef()

    const submitSearch = () => {
        const searched = searchedName.current.value.toLowerCase()
        //will only search users if the user enters something in the input
        findUsers(searched)
    }

    useEffect(() => {
        return () => {
            // reset search values after the user navigates away from the search page
            searchedName.current.value = ""
            findUsers("")
        }
    }, [])

    return (
        <>
            <h2>Search for Users</h2>

            <div className="userCard searchCard">
                <div className="searchdiv">
                    <input id="searchInput" type="text" ref={searchedName} placeholder="Search for a user" />
                    <button className="formBtn" onClick={submitSearch}>Search</button>
                </div>
            </div>

            <div>
                {
                    searchResults.map(user => <UserCard key={user.id} user={user} {...props} />)
                }
            </div>
        </>
    )

}

export default UserSearch
