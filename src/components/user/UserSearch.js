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