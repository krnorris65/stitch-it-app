import React, {useRef} from 'react'
import ApiManager from '../../modules/ApiManager'
import helper from '../../modules/helper'

const FabricForm = props => {
    const {firstLetterCase} = helper()
    const type = useRef()
    const count = useRef()

    const newFabric = evt => {
        evt.preventDefault()
        
        const fabric = {
            type: firstLetterCase(type.current.value),
            count: Number(count.current.value)
        }

        // checks to see if the fields are filled out and that the count is a valid number
        if(fabric.type === "" || fabric.count === 0){
            alert("Please add type and fabric count")
        }else if(isNaN(fabric.count) || fabric.count < 0) {
            alert("Please enter a valid number")
        } else {
            //make a get request to see if a fabric with that type and count exist
            ApiManager.getAll("fabrics", `type=${fabric.type}&count=${fabric.count}`)
            .then(response => {
                if(response.length > 0){
                    alert("Fabric already exists!")
                    //set the existing fabric that was entered as the selected option
                    props.updateFabricDropdown(response[0].id, "update")
                } else{
                    //if the fabric doesn't exist, add it to the database
                    //and get all the fabrics for the drop down
                    ApiManager.post("fabrics", fabric)
                    .then( newFabric => {
                        props.updateFabricDropdown(newFabric.id)
                    })
                }
            })
        }
    }

    return (
        <form onSubmit={newFabric}>
            <fieldset>
                <h3>New Fabric</h3>
                <div className="formgrid">
                    <input ref={type} type="text"
                        id="type"
                        placeholder="Type of Fabric"
                        required=""/>
                    <label htmlFor="inputType">Fabric Type</label>

                    <input ref={count} type="count"
                        id="count"
                        placeholder="Fabric Count"
                        required="" />
                    <label htmlFor="inputCount">Fabric Count</label>
                </div>
                <button type="submit">Add New Fabric</button>
            </fieldset>
        </form>
    )
}

export default FabricForm