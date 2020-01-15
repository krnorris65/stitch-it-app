import React, {useState, useEffect} from 'react'

const remoteURL = 'http://localhost:5002'

export const UserContext = React.createContext()

export const UserProvider = props => {
    const [followedUsers, setFollowedUsers] = useState([])
    const [unapprovedUsers, setUnapprovedUsers] = useState([])
    
    const [currentUser] = localStorage.getItem("currUserId")

    const getFollowedUsers = () => {
        return fetch(`${remoteURL}/follows?_expand=user&currentUserId=${currentUser}&pending=false`)
        .then(res => res.json())
        .then(setFollowedUsers)
    }

    const getUnapprovedRequests = () => {
        return fetch(`${remoteURL}/follows?userId=${currentUser}&pending=true`)
        .then(res => res.json())
        .then(setUnapprovedUsers)
    }

    //creates new follow 
    const followUser = (newFollow) => {
        return fetch(`${remoteURL}/follows`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFollow)
        })
        .then(getFollowedUsers)
    }

    //updates existing follow request to approve request
    const approveFollow = (id) => {
        const approveObj = {
            pending: false
        }
        return fetch(`${remoteURL}/follows/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(approveObj)
        })
        .then(getFollowedUsers)
        .then(getUnapprovedRequests)
    }

    //deletes follow
    const deleteFollow = (id) => {
        return fetch(`${remoteURL}/follows/${id}`, {
            method: "DELETE",
        })
        .then(getFollowedUsers)
        .then(getUnapprovedRequests)
    }

    useEffect(() => {
        getFollowedUsers()
    }, [])

    return (
        <UserContext.Provider value={{
            followedUsers, unapprovedUsers, followUser, approveFollow, deleteFollow
        }}>
            {props.children}
        </UserContext.Provider>
    )

}