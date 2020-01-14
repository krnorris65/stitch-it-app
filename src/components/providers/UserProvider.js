import React, {useState, useEffect} from 'react'

const remoteURL = 'http://localhost:5002'

export const UserContext = React.createContext()

export const UserProvider = props => {
    const [followedUsers, setFollowedUsers] = userState([])
    const [unapprovedUsers, setUnapprovedUsers] = userState([])
    
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

    }

    //updates existing follow request to approve request
    const approveFollow = (id) => {

    }

    //deletes follow
    const deleteFollow = (id) => {
        return fetch(`${remoteURL}/follows/${id}`, {
            method: "DELETE",
        })
        .then(getFollowedUsers)
        .then(getUnapprovedRequests)
    }

}