import React, {useRef, useContext} from 'react'
import helper from '../../modules/helper'

import { FabricContext } from '../providers/FabricProvider'


const FabricForm = props => {
    const {firstLetterCase} = helper()
    const type = useRef()
    const count = useRef()

    const {findFabricId, addFabric} = useContext(FabricContext)

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
            //make a get request to see if a fabric with that type and count exist and if so it returns the id
            findFabricId(fabric.type, fabric.count)
            .then(foundId => {
                if(foundId !== undefined){
                    //set the existing fabric that was entered as the selected option
                    props.updateFabricDropdownValue(foundId)
                } else{
                    //if the fabric doesn't exist, add it to the database
                    //and pass the new fabric id to the parent component
                    addFabric(fabric)
                    .then( newFabric => {
                        props.updateFabricDropdownValue(newFabric.id)
                    })
                }
            })
        }
    }

    return (
            <fieldset >
                <h3>New Fabric</h3>
                <div className="formgrid">
                    <label htmlFor="inputType">Fabric Type</label>
                    <input ref={type} type="text" id="type" placeholder="Type of Fabric" required=""/>

                    <label htmlFor="inputCount">Fabric Count</label>
                    <input ref={count} type="number" min="0" id="count" placeholder="Fabric Count" required="" />
                </div>
                <button type="submit" onClick={handleFabric}>Add New Fabric</button>
            </fieldset>
    )
}

export default FabricForm