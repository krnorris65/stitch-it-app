import React, { useState, useEffect } from 'react'

const remoteURL = "http://localhost:8000"

export const UserContext = React.createContext()

export const UserProvider = props => {
    const [followedUsers, setFollowedUsers] = useState([])
    const [unapprovedUsers, setUnapprovedUsers] = useState([])
    const [pendingRequests, setPendingRequests] = useState([])
    const [searchResults, setSearchResult] = useState([])

    const [currentUser] = localStorage.getItem("currUserId")

    const getFollowedUsers = () => {
        return fetch(`${remoteURL}/follows?pending=False`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            }
        })
            .then(res => res.json())
            .then(setFollowedUsers)
    }

    const getPendingRequests = () => {
        return fetch(`${remoteURL}/follows?pending=True`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            }
        })
            .then(res => res.json())
            .then(setPendingRequests)
    }

    const getSingleUser = (id) => {
        return fetch(`${remoteURL}/stitchers/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            }
        })
            .then(res => res.json())
    }

    const getFollowedUserInfo = (otherId) => {
        return getSingleUser(otherId)
    }

    const getAllUsersWithFollows = () => {
        return fetch(`${remoteURL}/users?_embed=follows`)
            .then(res => res.json())
    }

    const getUnapprovedRequests = () => {
        //need to have an additional request for each user to expand upon the requesting user's information
        return fetch(`${remoteURL}/follows?unapproved_request=True`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            }
        })
            .then(res => res.json())
            .then(setUnapprovedUsers)
            // .then(async unapprovedReq => {
            //     await Promise.all(
            //         unapprovedReq.map(async requestObj => {
            //             await getSingleUser(requestObj.currentUserId)
            //                 .then(userInfo => requestObj.user = userInfo)
            //         })
            //     )
            //     setUnapprovedUsers(unapprovedReq)
            // })
    }

    //creates new follow, sets the search results to an empty array and returns the new object
    const followUser = (newFollow) => {
        return fetch(`${remoteURL}/follows`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            },
            body: JSON.stringify(newFollow)
        })
            .then(newFollow => {
                setSearchResult([])
                return newFollow.json()
            })
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
            headers: {
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            }
        })
            .then(getFollowedUsers)
            .then(getUnapprovedRequests)
            .then(getPendingRequests)
            .then(() => setSearchResult([]))
    }

    const findUsers = (searched) => {
        if (searched !== "") {
            getAllUsersWithFollows()
                .then(allUsers => {
                    const filteredUsers = allUsers.filter(user => {
                        // concats first and last name into one string and converts it to lower case
                        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
                        // if the user's full name includes what was searched for return that user

                        return fullName.includes(searched)
                    })

                    setSearchResult(filteredUsers)
                })
        } else {
            setSearchResult([])
        }
    }

    useEffect(() => {
        getFollowedUsers()
        getUnapprovedRequests()
        getPendingRequests()
    }, [])


    return (
        <UserContext.Provider value={{
            followedUsers, unapprovedUsers, followUser, approveFollow, deleteFollow, findUsers, searchResults, pendingRequests, getSingleUser, getFollowedUserInfo
        }}>
            {props.children}
        </UserContext.Provider>
    )

}