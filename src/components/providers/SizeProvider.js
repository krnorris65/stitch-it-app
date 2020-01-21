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

    const findSizeId = (size) => {
        return fetch(`${remoteURL}/finishedSizes?size=${size}`)
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
        getSizes()
    }, [])

    return (
        <SizeContext.Provider value={{
            sizes, addSize, findSizeId
        }}>
            {props.children}
        </SizeContext.Provider>
    )
}