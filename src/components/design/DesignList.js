import React, { useState, useContext, useEffect } from 'react'
import DesignCard from './DesignCard'
import { DesignContext } from "../providers/DesignProvider"

const DesignList = props => {
    const followedUser = props.match.path.includes('following')
    const [followedDesigns, setFollowedDesigns] = useState([])

    let { designs, getOtherUserDesigns } = useContext(DesignContext)

    const getFollowedUserDesigns = () => {
        if (followedUser) {
            //get the other users designs
            getOtherUserDesigns(props.match.params.userId)
                .then(setFollowedDesigns)
        }
    }

    useEffect(getFollowedUserDesigns, [props.location.pathname])

    return (
        <>
            {
                (!followedUser) ?
                    <>
                        <section>
                            <button className="formBtn" onClick={() => props.history.push("/design/new")}>New Design</button>
                        </section>
                        <div className="design-container designEl">
                            {designs.map(design => <DesignCard key={design.id} design={design} {...props} />)}
                        </div>
                    </>
                    :
                    <>
                        <div className="design-container followed-designs">
                            {followedDesigns.map(design => <DesignCard key={design.id} design={design} {...props} />)}
                        </div>
                    </>

            }

        </>
    )
}

export default DesignList