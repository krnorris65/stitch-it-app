import React, { useState, useEffect } from 'react'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'


import UserSearch from './UserSearch'
import UserCard from './UserCard'
import UserFollowList from "./UserFollowList"
import UserUnapprovedList from "./UserUnapprovedList"
import { UserProvider } from "../providers/UserProvider"
import { DesignProvider } from "../providers/DesignProvider"

import DesignList from "../design/DesignList"

import '../styles/UserHome.css'

const UserHome = props => {
    const [showSection, setSection] = useState()
    const { hasPublicProfile } = useSimpleAuth()
    const [publicProfile, setPublicProfile] = useState(true)


    const selectSection = (section) => {
        setSection(section)
        props.history.push("/following/0")
    }

    //determines if the current user has a public profile when the component mounts
    useEffect(
        () => {
            hasPublicProfile()
            .then(profileStatus => {
                setPublicProfile(profileStatus)
            })
        }, []
    )
    //when component unmounts, remove the followedUser info from session storage
    useEffect(
        () => {
            return () => sessionStorage.removeItem("followedUser")
        }, []
    )

    return (
        <>

            <h2>User Home Page</h2>
            <button onClick={() => selectSection("")}>Search Users</button>
            {
                //only need to show unapproved request button if the current user doesn't have a public profile. if they have a public profile, then a user can follow them automatically so there won't be any pending requests ---CURRENTLY NOT WORKING, NEED TO IMPLEMENT
                (!publicProfile) ?
                <button onClick={() => selectSection("unapproved")}>View Unapproved Requests</button>
                : null
            }

            <div id="userContainer">
                <UserProvider>
                    <div className="userSection">
                        <UserFollowList {...props} />
                    </div>

                    <div className="userSection">

                        {
                            (showSection === "unapproved") ?
                                <UserUnapprovedList />
                                : (Number(props.match.params.userId) > 0 && sessionStorage.getItem("followedUser") !== null) ?
                                    <>
                                        <UserCard {...props} user={JSON.parse(sessionStorage.getItem("followedUser"))} showDesign={true} />
                                        <DesignProvider>
                                            <DesignList {...props} />
                                        </DesignProvider>

                                    </>
                                    : <UserSearch {...props} />
                        }
                    </div>
                </UserProvider>
            </div>
        </>
    )
}

export default UserHome