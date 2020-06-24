import { useContext } from 'react'
import { UserContext } from '../../components/providers/UserProvider'

const useFollowStatus = stitcher => {
    const [currentUser] = localStorage.getItem("currUserId")

    const { followedUsers, pendingRequests } = useContext(UserContext)

    //status types: current, following, notFollowing, pending
    
    const findStatus = () => {
        //checks to see if the user is followed by the current user
        const found = followedUsers.find(followInfo => followInfo.stitcher_id === stitcher.user_id)
        //checks to see if the user has an unresolved follow request from the current user
        const pending = pendingRequests.find(pendingInfo => pendingInfo.stitcher_id === stitcher.user_id)

        if (stitcher.user_id === Number(currentUser)) {
            // current - user is the current user
            return {
                status: "current"
            }
        } else if (found !== undefined) {
            // following - user is followed by the current user 
            return {
                status: "following",
                followId: found.id
            }
        } else if (pending !== undefined) {
            // pending - user has private profile and has not approved current users follow request
            return {
                status: "pending",
                followId: pending.id
        }
        } else {
            // notFollowing - user is not followed by the current user
            return {
                status: "notFollowing"
        }
        }

    }


    return { findStatus }
}

export default useFollowStatus