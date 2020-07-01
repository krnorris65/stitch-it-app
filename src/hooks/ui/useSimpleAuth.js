import { useState } from 'react'

const remoteURL = "http://localhost:8000"

const useSimpleAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    //verifies whether a user is logged into the app by checking if the state of loggedIn is true or stitchit-token in localStorage is not null
    const isAuthenticated = () => {
        return loggedIn || localStorage.getItem("stitchit-token") !== null

    }

    const currentUserInfo = () => {
        const stitcherId = localStorage.getItem("stitcher_id")
        console.log("run current")
        if(stitcherId){
            return fetch(`${remoteURL}/stitchers/${stitcherId}`)
            .then(res => res.json())
        }
    }

    const hasPublicProfile = () => {
        const stitcherId = localStorage.getItem("stitcher_id")
        return fetch(`${remoteURL}/stitchers/${stitcherId}`)
        .then(res => res.json())
        .then(user => {
            localStorage.setItem("publicProfile", user.public_profile)

        })
    }

    const register = userInfo => {
        //a new user is created by posting to the database by targeting the register endpoint
        return fetch(`${remoteURL}/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(res => {
                if (typeof res === "object" && "token" in res) {
                    //after registering a new user, their api token is stored in localStorage to then log the user in and state of loggedIn to true
                    localStorage.setItem("stitchit-token", res.token)
                    localStorage.setItem("stitcher_id", res.stitcher_id)
                    setLoggedIn(true)
                    hasPublicProfile()
                    return "/"
                } else {
                    alert(res)
                    return "/register"
                }
            })
    }

    const login = userInfo => {
        //logs an existing user in by targeting the login in endpoint and verifying that the email/password matches for 
        return fetch(`${remoteURL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (typeof res === "object" && "token" in res) {
                    //after verifying that the user entered in correct credentials, their api token is stored in localStorage and state of loggedIn is set to true
                    localStorage.setItem("stitchit-token", res.token)
                    localStorage.setItem("stitcher_id", res.stitcher_id)
                    setLoggedIn(true)
                    hasPublicProfile()
                    
                    //return false if login was successful
                    return false
                } else {
                    alert("Invalid credentials")
                    //return true if login failed
                    return true
                }
            })
    }

    const logout = () => {
        //when the user logs out, state of loggedIn is set to false and their id is removed from localStorage
        setLoggedIn(false)
        localStorage.removeItem("stitchit-token")
        localStorage.removeItem("publicProfile")
        localStorage.removeItem("stitcher_id")
    }

    return { isAuthenticated, logout, login, register, hasPublicProfile, currentUserInfo }
}

export default useSimpleAuth