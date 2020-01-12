import React, { useContext } from 'react'
import DesignCard from './DesignCard'
import ApiManager from '../../modules/ApiManager'
import {DesignContext } from "../providers/DesignProvider"

const DesignList = props => {
    // const [designs, setDesigns] = useState([])
    // const [currentUser] = localStorage.getItem("currUserId")

    // const getDesigns = () => {
    //     ApiManager.getAll("designs", `userId=${currentUser}`)
    //     .then(allDesigns => {
    //         setDesigns(allDesigns)
    //     })
    // }
    
    // const deleteDesign = id => {
    //     //confirm returns true or false depending on what the user clicks
    //     const deleteThis = window.confirm("Are you sure you want to delete this design?")
        
    //     if (deleteThis) {
    //         ApiManager.delete("designs", id)
    //         .then(() => {
    //                 ApiManager.getAll("designs", `userId=${currentUser}`)
    //                     .then(allDesigns => {
    //                         setDesigns(allDesigns)
    //                     })
    //             })
    //     }
    // }

    // useEffect(getDesigns, [])

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