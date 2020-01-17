import React, { useState } from 'react'

import UserSearch from './UserSearch'
import UserFollowList from "./UserFollowList"
import UserUnapprovedList from "./UserUnapprovedList"

import DesignList from "../design/DesignList"
import { DesignProvider } from "../providers/DesignProvider"

import '../styles/UserHome.css'



const UserHome = props => {

    const [showSection, setSection] = useState()

    const selectSection = (section) => {
        setSection(section)
        props.history.push("/following")
    }

    return (
        <>
            <h2>User Home Page</h2>
            <button onClick={() => selectSection("")}>Search Users</button>
            <button onClick={() => selectSection("unapproved")}>View Unapproved Requests</button>

            <div id="userContainer">

                <div className="userSection">
                    <UserFollowList {...props} />
                </div>

                <div className="userSection">

                    {
                        (showSection === "unapproved") ?
                            <UserUnapprovedList />
                            : (props.match.path.includes('designs')) ?
                                <DesignProvider>
                                    <DesignList {...props} />
                                </DesignProvider>
                                : <UserSearch {...props}/>
                    }

                </div>
            </div>

        </>
    )
}

export default UserHome