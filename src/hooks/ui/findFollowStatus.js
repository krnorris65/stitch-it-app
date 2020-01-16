import {useState} from 'react'

const findFollowStatus = user => {


    //status types
    // current - user is the current user
    // following - user is followed by the current user 
    // notFollowing - user is not followed by the current user
    // pending - user has private profile and has not approved current users follow request
    // unapproved - user sent current user a follow request and the current user hasn't approved (or declined) it yet
}

export default findFollowStatus