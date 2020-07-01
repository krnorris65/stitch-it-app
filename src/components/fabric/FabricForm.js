import React, { useRef, useContext } from 'react'
import helper from '../../modules/helper'
import CloseIcon from '@material-ui/icons/Close';


import { FabricContext } from '../providers/FabricProvider'



const FabricForm = props => {
    const { firstLetterCase } = helper()
    const type = useRef()
    const count = useRef()

    const {addFabric } = useContext(FabricContext)

    const handleFabric = evt => {
        evt.preventDefault()

        const fabric = {
            type: firstLetterCase(type.current.value),
            count: Number(count.current.value)
        }

        // checks to see if the fields are filled out and that the count is a valid number
        if (fabric.type === "" || fabric.count === 0) {
            alert("Please add type and fabric count (must be greater than 0)")
        } else {
            //add new fabric to the database and update the FabricDropdownValue. If the fabric already exists the api will not create a new instance, but will return the existing one.
            addFabric(fabric)
                .then(newFabric => {
                    props.updateFabricDropdownValue(newFabric.id)
                })
        }
    }

    return (
        <article className="sub-form formEl">
            <div className="formBkgd">

                <CloseIcon className="iconRight" onClick={props.handleClose} />
                <h3>New Fabric</h3>
                <div className="formgrid">
                    <label htmlFor="inputType">Fabric Type</label>
                    <input ref={type} type="text" id="type" placeholder="Type of Fabric" required="" />
                </div>

                <div className="formgrid">
                    <label htmlFor="inputCount">Fabric Count</label>
                    <input ref={count} type="number" min="0" id="count" placeholder="Fabric Count" required="" />
                </div>
                <div className="alignRight">
                    <button className="formBtn" type="submit" onClick={handleFabric}>Add New</button>
                </div>
            </div>
        </article>
    )
}

export default FabricForm