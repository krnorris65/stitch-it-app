import React, { useEffect, useState } from 'react'
import DesignCard from './DesignCard'
import ApiManager from '../../modules/ApiManager'

const DesignList = props => {
    const [designs, setDesigns] = useState([])
    const [currentUser] = localStorage.getItem("currUserId")

    const getDesigns = () => {
        // const currentUser = localStorage.getItem("currUserId")
        console.log(currentUser)
        ApiManager.getAll("designs", `userId=${currentUser}`)
        .then(allDesigns => {
            setDesigns(allDesigns)
        })
    }
    
    const deleteDesign = id => {
        const deleteThis = window.confirm("Are you sure you want to delete this design?")
        
        if (deleteThis) {
            ApiManager.delete("designs", id)
            .then(() => {
                    ApiManager.getAll("designs", `userId=${currentUser}`)
                        .then(allDesigns => {
                            setDesigns(allDesigns)
                        })
                })
        }
    }

    useEffect(getDesigns, [])

    return (
        <>
            <section>
                <button onClick={() => props.history.push("/design/new")}>Add New Design</button>
            </section>
            <div className="container-cards">
                {designs.map(design => <DesignCard key={design.id} design={design} deleteDesign={deleteDesign} {...props} />)}
            </div>
        </>
    )
}

export default DesignList