import React, { useState} from 'react'

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

    const selectSection = (section) => {
        setSection(section)
        props.history.push("/following/0")
    }

    return (
        <>

            <h2>User Home Page</h2>
            <button onClick={() => selectSection("")}>Search Users</button>
            {
                //only need to show unapproved request button if the current user doesn't have a public profile. if they have a public profile, then a user can follow them automatically so there won't be any pending requests ---CURRENTLY NOT WORKING, NEED TO IMPLEMENT

                <button onClick={() => selectSection("unapproved")}>View Unapproved Requests</button>
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
                                : (props.match.params.userId > 0) ?
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