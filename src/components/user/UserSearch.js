import React, {useRef} from 'react'
import ApiManager from '../../modules/ApiManager'

const UserSearch = props => {

    const searchedName = useRef()


    const findUser = () => {
        const searched = searchedName.current.value.toLowerCase()
        ApiManager.getAll("users")
        .then(allUsers => {
            console.log(allUsers)
            console.log(searched)

            const filteredUsers = allUsers.filter(user => {
                // concats first and last name into one string and converts it to lower case
                const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
                // if the user's full name includes what was searched for return that user
                return fullName.includes(searched)
            })


            console.log(filteredUsers)
        })
    }

    return (
        <>
        <h2>Find Users</h2>

        <input type="text" ref={searchedName} placeholder="Search for a user"/>
        <button onClick={findUser}>Search</button>
        </>
    )

}

export default UserSearch