import React, { useState, useEffect } from 'react'

const remoteURL = "http://localhost:5002"

export const SizeContext = React.createContext()

export const SizeProvider = props => {
    const [sizes, setSizes] = useState([])

    const getSizes = () => {
        return fetch(`${remoteURL}/finishedSizes?_sort=size`)
            .then(res => res.json())
            .then(setSizes)
    }

    const addSize = newSize => {
        return fetch(`${remoteURL}/finishedSizes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSize)
        })
            .then(res => res.json())
            .then(newSize => {
                return getSizes()
                    .then(() => newSize)
            })
    }

    const findSize = (size) => {
        return fetch(`${remoteURL}/finishedSizes?size=${size}`)
            .then(res => res.json())
    }

    useEffect(() => {
        getSizes()
    }, [])

    return (
        <SizeContext.Provider value={{
            sizes, addSize, findSize
        }}>
            {props.children}
        </SizeContext.Provider>
    )
}