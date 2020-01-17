import React, { useState, useContext, useEffect } from 'react'
import DesignCard from './DesignCard'
import {DesignContext } from "../providers/DesignProvider"

const DesignList = props => {
    const [otherUser] = useState(props.match.path.includes('following'))
    const [otherDesigns, setOtherDesigns] = useState([])


    let {designs, getOtherUserDesigns} = useContext(DesignContext)

    const checkIfOtherUser = () => {
        if(otherUser){
            getOtherUserDesigns(props.match.params.userId)
            .then(setOtherDesigns)  
        }
    }

    useEffect(checkIfOtherUser, [props.location.pathname])

    return (
        <>
            {
            (!otherUser) ? 
            <>
            <section>
                <button onClick={() => props.history.push("/design/new")}>Add New Design</button>
            </section> 
            <div className="container-cards">
                {designs.map(design => <DesignCard key={design.id} design={design} {...props} />)}
            </div>
            </>
            : null
            }
            <div className="container-cards">
                {otherDesigns.map(design => <DesignCard key={design.id} design={design} {...props} />)}
            </div>
        </>
    )
}

export default DesignList