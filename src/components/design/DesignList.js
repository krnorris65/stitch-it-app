import React, { useContext } from 'react'
import DesignCard from './DesignCard'
import {DesignContext } from "../providers/DesignProvider"

const DesignList = props => {

    const {designs} = useContext(DesignContext)

    return (
        <>
            <section>
                <button onClick={() => props.history.push("/design/new")}>Add New Design</button>
            </section>
            <div className="container-cards">
                {designs.map(design => <DesignCard key={design.id} design={design} {...props} />)}
            </div>
        </>
    )
}

export default DesignList