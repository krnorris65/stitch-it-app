import React, { useState, useEffect, useContext } from 'react'

import UserSearch from './UserSearch'
import UserCard from './UserCard'
import UserFollowList from "./UserFollowList"
import UserUnapprovedList from "./UserUnapprovedList"
import { DesignProvider } from "../providers/DesignProvider"
import { UserContext } from "../providers/UserProvider"

import DesignList from "../design/DesignList"

import '../styles/UserHome.css'

const UserHome = props => {
    //following, search, pending, user-designs
    const [showSection, setSection] = useState("")
    const [hasPublicProfile] = localStorage.getItem("publicProfile")
    const [otherUserInfo, setOtherUserInfo] = useState({})

    let { getFollowedUserInfo } = useContext(UserContext)


    const getCurrentSection = () => {
        const userId = props.match.params.userId
        const followId = props.match.params.followId
        //if the params has a userId find if the user is followed by the current user
        if (userId && followId) {
            findOtherUser(userId)
        } else {
            setSection(props.match.params.sectionType)
        }
    }

    const findOtherUser = (id) => {
        getFollowedUserInfo(id)
            .then(userInfo => {
                //if user info comes back set it as other user info and set the section to user-designs
                if (userInfo) {
                    setOtherUserInfo(userInfo)
                    setSection("user-designs")
                } else {
                    //else show following page
                    setSection("following")
                }
            })
    }

    useEffect(getCurrentSection, [props.location.pathname])


    return (
        <>
            {
                <button className="userBtn" onClick={() => props.history.push("/users/following")}>Following</button>
            }
            {
                <button className="userBtn" onClick={() => props.history.push("/users/search")}>Search for Users</button>
            }
            {
                //only need to show unapproved request button if the current user doesn't have a public profile. if they have a public profile, then a user can follow them automatically so there won't be any pending requests. 
                //When getting information out of localStorage false comes back as "f"

                (hasPublicProfile === "f") ?
                    <button className="userBtn" onClick={() => props.history.push("/users/pending")}>View Follow Requests</button>
                    : null
            }

            <article className="userContainer">
                {
                    (showSection === "following") ?
                        <>
                            <UserFollowList {...props} />
                        </> :
                        (showSection === "search") ?
                            <>
                                <UserSearch {...props} />

                            </> :
                            (showSection === "pending") ?
                                <>
                                    <UserUnapprovedList />

                                </> :
                                (showSection === "user-designs") ?
                                    <>
                                        <UserCard {...props} stitcher={otherUserInfo} showDesign={true} />
                                        <DesignProvider>
                                            <DesignList {...props} />
                                        </DesignProvider>
                                    </> : null
                }
            </article>

        </>
    )
}

export default UserHome