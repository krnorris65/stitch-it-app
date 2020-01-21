import React, { useState, useContext } from 'react'

import UserSearch from './UserSearch'
import UserFollowList from "./UserFollowList"
import UserUnapprovedList from "./UserUnapprovedList"
import { UserContext } from '../providers/UserProvider'

import DesignList from "../design/DesignList"

import '../styles/UserHome.css'



const UserHome = props => {

    const [showSection, setSection] = useState()

    const { deleteFollow } = useContext(UserContext)


    const selectSection = (section) => {
        setSection(section)
        props.history.push("/following")
    }
    
    
    // const unfollowFromDesign = (followId) => {
    //     // deleteFollow(followId)
    //     props.history.push("/following")
    // }
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
                                <>
                                    <h2>{props.location.state.firstName} {props.location.state.lastName}'s Designs</h2>
                                    {/* <button onClick={() => unfollowFromDesign(props.location.state.followId)}>Unfollow</button> */}
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