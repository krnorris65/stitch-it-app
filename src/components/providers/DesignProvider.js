import React, { useState, useEffect } from 'react'

const remoteURL = "http://localhost:8000"
/*
    The context is imported and used by individual components
    that need data
*/
export const DesignContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const DesignProvider = props => {
    const [designs, setDesigns] = useState([])

    const getDesigns = () => {
        return fetch(`${remoteURL}/designs`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            }
        })
            .then(res => res.json())
            .then(setDesigns)
    }

    const getOtherUserDesigns = (userId) => {
        return fetch(`${remoteURL}/designs?stitcher=${userId}`)
            .then(res => res.json())
    }

    const getOneDesign = (id) => {
        return fetch(`${remoteURL}/designs/${id}`)
            .then(res => res.json())
    }
    const addDesign = (newDesign) => {
        return fetch(`${remoteURL}/designs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            },
            body: JSON.stringify(newDesign)
        })
        // .then(getDesigns)
    }

    const editDesign = (editedDesign) => {
        return fetch(`${remoteURL}/designs/${editedDesign.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            },
            body: JSON.stringify(editedDesign)
        })
        // .then(getDesigns)
    }

    const deleteDesign = (id) => {
        return fetch(`${remoteURL}/designs/${id}`, {
            method: "DELETE",
            header: {
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            }
        })
            .then(getDesigns)
    }

    // Load all designs when component is mounted
    useEffect(() => {
        getDesigns()
    }, [])


    return (
        <DesignContext.Provider value={{
            designs, addDesign, editDesign, deleteDesign, getOneDesign, getOtherUserDesigns
        }}>
            {props.children}
        </DesignContext.Provider>
    )
}