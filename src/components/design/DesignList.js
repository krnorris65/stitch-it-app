import React, { useState, useContext, useEffect } from 'react'
import DesignCard from './DesignCard'
import { DesignContext } from "../providers/DesignProvider"

const DesignList = props => {
    const [otherUserInfo, setOtherInfo] = useState(props.location.state)
    const [otherDesigns, setOtherDesigns] = useState([])


    let { designs, getOtherUserDesigns } = useContext(DesignContext)

    const checkIfOtherUser = () => {
        if (otherUserInfo) {
            //change user info when toggling between followed users profiles
            setOtherInfo(props.location.state)
            //get the other users designs
            getOtherUserDesigns(props.match.params.userId)
                .then(setOtherDesigns)
        }
    }

    useEffect(checkIfOtherUser, [props.location.pathname])

    return (
        <>
            {
                (!otherUserInfo) ?
                    <>
                        <section>
                            <button onClick={() => props.history.push("/design/new")}>Add New Design</button>
                        </section>
                        <div className="container-cards">
                            {designs.map(design => <DesignCard key={design.id} design={design} {...props} />)}
                        </div>
                    </>
                    :
                    <>
                        <h2>{otherUserInfo.firstName}'s Designs</h2>
                        <div className="container-cards">
                            {otherDesigns.map(design => <DesignCard key={design.id} design={design} {...props} />)}
                        </div>
                    </>
            }

        </>
    )
}

export default DesignList