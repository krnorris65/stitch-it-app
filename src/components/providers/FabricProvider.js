import React, { useState, useEffect } from 'react'

const remoteURL = "http://localhost:5002"

export const FabricContext = React.createContext()

export const FabricProvider = props => {
    const [fabrics, setFabrics] = useState([])

    const getFabrics = (fabId) => {
        return fetch(`${remoteURL}/fabrics?_sort=type,count`)
            .then(res => res.json())
            .then(setFabrics)
    }

    const addFabric = newFabric => {
        return fetch(`${remoteURL}/fabrics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFabric)
        })
        .then(res => res.json())
            .then(newFab => {
                return getFabrics()
                .then(() => newFab)
            })
    }

    const findFabricId = (type, count) => {
        return fetch(`${remoteURL}/fabrics?type=${type}&count=${count}`)
            .then(res => res.json())
            .then(result => {
                if(result.length > 0){
                    return result[0].id
                } else {
                    return undefined
                }
            })
    }

    useEffect(() => {
        getFabrics()
    }, [])

    return (
        <FabricContext.Provider value={{
            fabrics, addFabric, findFabricId
        }}>
            {props.children}
        </FabricContext.Provider>
    )
}