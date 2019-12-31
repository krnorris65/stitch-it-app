import React, {useEffect, useState} from 'react'
import DesignCard from './DesignCard'
import ApiManager from '../../modules/ApiManager'

const DesignList = props => {
    const [designs, setDesigns] = useState([])

    const getDesigns = () => {
        const currentUser = localStorage.getItem("currUserId")
        ApiManager.getAll("designs", `userId=${currentUser}`)
        .then(allDesigns => {
            setDesigns(allDesigns)
        })
    }

    useEffect(getDesigns, [])

    return (
        <>
        <section>
            <button>Add New Design</button>
        </section>
        <div className="container-cards">
            {designs.map(design => <DesignCard key={design.id} design={design} />)}
        </div>
        </>
    )
}

export default DesignList