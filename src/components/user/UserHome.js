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
    //following, search, pending, user-designs
    const [showSection, setSection] = useState("")
    const { hasPublicProfile } = useSimpleAuth()
    const [publicProfile, setPublicProfile] = useState(true)

    const selectSection = (section) => {
        setSection(section)
    }

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
            {
                <button className="formBtn" onClick={() => props.history.push("/users/search")}>Find Users</button>
            }
            {
                //only need to show unapproved request button if the current user doesn't have a public profile. if they have a public profile, then a user can follow them automatically so there won't be any pending requests 
                (!publicProfile) ?
                    <button className="formBtn" onClick={() => props.history.push("/users/pending")}>View Follow Requests</button>
                    : null
            }
            {
                <button className="formBtn" onClick={() => props.history.push("/users/following")}>Following Users</button>
            }
            {
                <button className="formBtn" onClick={() => props.history.push("/users/following/1")}>Users 2 Page</button>
            }
            {/* <article id="userContainer"> */}
            <article className="userSection">
                {
                    (showSection === "following") ?
                        <>
                            <p>Following</p>
                            <UserFollowList {...props} />
                        </> :
                        (showSection === "search") ?
                            <>
                                <p>Search</p>
                                <UserSearch {...props} />

                            </> :
                            (showSection === "pending") ?
                                <>
                                    <p>Pending</p>
                                    <UserUnapprovedList />

                                </> :
                                (showSection === "user-designs") ?
                                    <>
                                        <p>Design</p>
                                        {/* <UserCard {...props} user={JSON.parse(sessionStorage.getItem("followedUser"))} showDesign={true} /> */}
                                        <DesignProvider>
                                            <DesignList {...props} />
                                        </DesignProvider>
                                    </> : null
                }
            </article>
            {/* <section className="userSection sideSection"> */}
            {/* <section className="userSection mainSection"> */}

        </>
    )
}

export default UserHome