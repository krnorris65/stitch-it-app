import React, {useState, useEffect} from 'react'

const remoteURL = "http://localhost:5002"

export const FabricContext = React.createContext()

export const FabricProvider = props => {
    const [fabrics, setFabrics] = useState([])

    const getFabrics = () => {
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
        .then(getFabrics)
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