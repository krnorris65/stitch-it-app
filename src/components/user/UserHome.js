import React, { useState, useContext, useEffect } from 'react'

import UserSearch from './UserSearch'
import UserFollowList from "./UserFollowList"
import UserUnapprovedList from "./UserUnapprovedList"
import { UserContext } from '../providers/UserProvider'

import DesignList from "../design/DesignList"

import '../styles/UserHome.css'



const UserHome = props => {

    const [showSection, setSection] = useState()
    const [publicProfile, setProfile] = useState()

    const { getSingleUser, deleteFollow } = useContext(UserContext)

    const [currentUser] = localStorage.getItem("currUserId")

    const isProfilePublic = () => {
        getSingleUser(currentUser).then(userInfo => {
            setProfile(userInfo.publicProfile)
        })
    }


    const selectSection = (section) => {
        setSection(section)
        props.history.push("/following")
    }
    
    
    const unfollowFromDesign = (followId) => {
        deleteFollow(followId)
        props.history.push("/following")
        setSection("")
    }

    useEffect(isProfilePublic, [])

    return (
        <>
            <h2>User Home Page</h2>
            <button onClick={() => selectSection("")}>Search Users</button>
            {
                //only need to show unapproved request button if the current user doesn't have a public profile. if they have a public profile, then a user can follow them automatically so there won't be any pending requests
                (!publicProfile) ?
                <button onClick={() => selectSection("unapproved")}>View Unapproved Requests</button> : null
            }

            <div id="userContainer">

                <div className="userSection">
                    <UserFollowList {...props} />
                </div>

                <div className="userSection">

                    {
                        (showSection === "unapproved") ?
                            <UserUnapprovedList />
                            : (props.match.path.includes('designs')) ?
                                <>
                                    <h2>{props.location.state.firstName} {props.location.state.lastName}'s Designs</h2>
                                    <button onClick={() => unfollowFromDesign(props.location.state.followId)}>Unfollow</button>
                                    <DesignList {...props} />
                                </>
                                : <UserSearch {...props} />
                    }

                </div>
            </div>

        </>
    )
}

export default UserHome