import React, {useState, useEffect} from 'react'

const remoteURL = "http://localhost:5002"
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
    const [currentUser] = localStorage.getItem("currUserId")


    const getDesigns = () => {
        return fetch(`${remoteURL}/designs?_expand=fabric&_expand=finishedSize&userId=${currentUser}`)
        .then(res => res.json())
        .then(setDesigns)
    }

    const getOtherUserDesigns = (userId) => {
        console.log(userId)
        return fetch(`${remoteURL}/designs?_expand=fabric&_expand=finishedSize&userId=${userId}`)
        .then(res => res.json())
    }

    const getOneDesign = (id) => {
        return fetch(`${remoteURL}/designs/${id}?_expand=fabric&_expand=finishedSize`)
        .then(res => res.json())
    }
    const addDesign = (newDesign) => {
        return fetch(`${remoteURL}/designs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDesign)
        })
        // .then(getDesigns)
    }

    const editDesign = (editedDesign) => {
        return fetch(`${remoteURL}/designs/${editedDesign.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedDesign)
        })
        // .then(getDesigns)
    }

    const deleteDesign = (id) => {
        return fetch(`${remoteURL}/designs/${id}`, {
            method: "DELETE",
        })
        .then(getDesigns)
    }

    // Load all designs when component is mounted
    useEffect(() => {
        getDesigns()
    }, [])


    return (
        <DesignContext.Provider value={{
            designs, addDesign, editDesign, deleteDesign, getOneDesign, getOtherUserDesigns}}>
                {props.children}
            </DesignContext.Provider>
    )
}