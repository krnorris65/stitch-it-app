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
                console.log(response)
                if(response.length > 0){
                    alert("Fabric already exists!")
                    props.changeToggle()
                } else{
                    //if the fabric doesn't exist, add it to the database
                    ApiManager.post("fabrics", fabric)
                    .then(props.changeToggle)
                }
            })
        }
        // props.changeToggle()
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
                    <label htmlFor="inputPassword">Fabric Count</label>
                </div>
                <button type="submit">Add New Fabric</button>
            </fieldset>
        </form>
    )
}

export default FabricForm