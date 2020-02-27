import React, { useState, useEffect } from 'react'

import UserSearch from './UserSearch'
import UserCard from './UserCard'
import UserFollowList from "./UserFollowList"
import UserUnapprovedList from "./UserUnapprovedList"
import { DesignProvider } from "../providers/DesignProvider"

import DesignList from "../design/DesignList"

import '../styles/UserHome.css'

const UserHome = props => {
    //following, search, pending, user-designs
    const [showSection, setSection] = useState("")
    const [hasPublicProfile] = localStorage.getItem("publicProfile")

    const findSection = () => {
        const urlPath = props.match.path
        const currentSection = urlPath.split("/")[2]
        const userId = props.match.params.userId

        //if the params has a userId set the section to user-design
        if (userId) {
            setSection("user-designs")
        } else {
            //else set it to the section from the url
            setSection(currentSection)
        }
    }

    useEffect(findSection, [])


    //when component unmounts, remove the followedUser info from session storage
    useEffect(
        () => {
            return () => sessionStorage.removeItem("followedUser")
        }, []
    )

    return (
        <>
            {
                <button className="userBtn" onClick={() => props.history.push("/users/search")}>Find Users</button>
            }
            {
                <button className="userBtn" onClick={() => props.history.push("/users/following")}>Following Users</button>
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
                                        {/* <UserCard {...props} user={JSON.parse(sessionStorage.getItem("followedUser"))} showDesign={true} /> */}
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