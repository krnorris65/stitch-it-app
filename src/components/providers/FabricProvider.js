import React, { useState, useEffect } from 'react'

const remoteURL = "http://localhost:8000"

export const FabricContext = React.createContext()

export const FabricProvider = props => {
    const [fabrics, setFabrics] = useState([])

    const getFabrics = (fabId) => {
        return fetch(`${remoteURL}/fabrics`)
            .then(res => res.json())
            .then(setFabrics)
    }

    const addFabric = newFabric => {
        return fetch(`${remoteURL}/fabrics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("stitchit-token")}`
            },
            body: JSON.stringify(newFabric)
        })
        .then(res => res.json())
            .then(newFab => {
                return getFabrics()
                .then(() => newFab)
            })
    }

    useEffect(() => {
        getFabrics()
    }, [])

    return (
        <FabricContext.Provider value={{
            fabrics, addFabric
        }}>
            {props.children}
        </FabricContext.Provider>
    )
}