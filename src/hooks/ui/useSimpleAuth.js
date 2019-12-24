import { useState } from 'react'

const remoteURL = "http://localhost:5002"

const useSimpleAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    //verifies whether a user is logged into the app by checking if the state of loggedIn is true or currUserId in localStorage is not null
    const isAuthenticated = () => {
        return loggedIn || localStorage.getItem("currUserId") !== null

    }

    const register = userInfo => {
        //a new user is created by posting to the database by targeting the register endpoint
        return fetch(`${remoteURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(res => {
                console.log("register", res)
                if (typeof res === "object" && "accessToken" in res) {
                    //after registering a new user, their id is stored in localStorage to then log the user in and state of loggedIn to true
                    localStorage.setItem("currUserId", res.user.id)
                    setLoggedIn(true)
                    return "/"
                } else {
                    alert("User Email Already Exist")
                    return "/register"
                }
            })
    }

    const login = userInfo => {
        //logs an existing user in by targeting the login in endpoint and verifying that the email/password matches for 
        return fetch(`${remoteURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(res => {
                console.log("login", res)
                if (typeof res === "object" && "accessToken" in res) {
                    //after verifying that the user entered in correct credentials, their id is stored in localStorage and state of loggedIn is set to true
                    localStorage.setItem("currUserId", res.user.id)
                    setLoggedIn(true)
                    return "/"
                } else {
                    alert("User Not Found")
                    return "/login"
                }
            })
    }

    const logout = () => {
        //when the user logs out, state of loggedIn is set to false and their id is removed from localStorage
        setLoggedIn(false)
        localStorage.removeItem("currUserId")
    }

    return { isAuthenticated, logout, login, register }
}

export default useSimpleAuth