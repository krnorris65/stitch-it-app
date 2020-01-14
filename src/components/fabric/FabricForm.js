import React, {useRef, useContext} from 'react'
import ApiManager from '../../modules/ApiManager'
import helper from '../../modules/helper'

import { FabricContext } from '../providers/FabricProvider'


const FabricForm = props => {
    const {firstLetterCase} = helper()
    const type = useRef()
    const count = useRef()

    const {findFabric, addFabric} = useContext(FabricContext)

    const handleFabric = evt => {
        evt.preventDefault()
        
        const fabric = {
            type: firstLetterCase(type.current.value),
            count: Number(count.current.value)
        }

        // checks to see if the fields are filled out and that the count is a valid number
        if(fabric.type === "" || fabric.count === 0){
            alert("Please add type and fabric count (must be greater than 0)")
        } else {
            //make a get request to see if a fabric with that type and count exist
            findFabric(fabric.type, fabric.count)
            .then(found => {
                if(found.length > 0){
                    //set the existing fabric that was entered as the selected option
                    props.updateFabricDropdown(found[0].id)
                } else{
                    //if the fabric doesn't exist, add it to the database
                    //and pass the new fabric id to the parent component
                    addFabric(fabric)
                    .then( newFabric => {
                        props.updateFabricDropdown(newFabric.id)
                    })
                }
            })
        }
    }

    return (
            <fieldset className="sub--form">
                <h3>New Fabric</h3>
                <div className="formgrid">
                    <input ref={type} type="text"
                        id="type"
                        placeholder="Type of Fabric"
                        required=""/>
                    <label htmlFor="inputType">Fabric Type</label>

                    <input ref={count} type="number" min="0"
                        id="count"
                        placeholder="Fabric Count"
                        required="" />
                    <label htmlFor="inputCount">Fabric Count</label>
                </div>
                <button type="submit" onClick={handleFabric}>Add New Fabric</button>
            </fieldset>
    )
}

export default FabricForm