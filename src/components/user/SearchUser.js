import React, { useState, useRef } from 'react'
import ApiManager from '../../modules/ApiManager'

import SearchCard from './SearchCard'

const SearchUser = props => {
    const [searchedUsers, setSearched] = useState([])

    const searchedName = useRef()


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


    return (
        <>
            <h2>Find Users</h2>

            <input type="text" ref={searchedName} placeholder="Search for a user" />
            <button onClick={findUser}>Search</button>

            <div>
                {
                    searchedUsers.map(user => <SearchCard key={user.id} user={user} />)
                }
            </div>
        </>
    )

}

export default SearchUser