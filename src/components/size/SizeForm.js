import React, { useRef, useState, useContext } from 'react'
import {SizeContext} from '../providers/SizeProvider'

const SizeForm = props => {

    const [round, setRound] = useState(false)


    const width = useRef()
    const height = useRef()
    const unit = useRef()

    const {findSizeId, addSize} = useContext(SizeContext)

    const handleSize = evt => {
        evt.preventDefault()

        const sizeObj = {}

        //only targeting .current here so that an error doesn't throw if there is no height
        const specs = {
            width: width.current,
            unit: unit.current,
            height: height.current
        }

        if (specs.width.value === "" || (specs.height !== null && specs.height.value === "")) {
            alert("Enter Measurement")
        } else {

            if (round) {
                sizeObj.size = `${specs.width.value} ${specs.unit.value} round`
            } else {
                sizeObj.size = `${specs.width.value}x${specs.height.value} ${specs.unit.value}`
            }

            findSizeId(sizeObj.size)
                .then(foundId => {
                    if (foundId !== undefined) {
                        props.updateSizesDropdown(foundId)
                    } else {
                        addSize(sizeObj)
                            .then(newSize => {
                                props.updateSizesDropdown(newSize.id)
                            })
                    }
                })

        }



    }

    return (
        <fieldset className="sub--form">
            <h3>New Size</h3>
            <div className="formgrid">
                <input type="checkbox" checked={round} onChange={() => round ? setRound(false) : setRound(true)} />
                <label htmlFor="sizeUnit">Round Design</label>
                {/* <span>If your design is oval do not check</span> */}
            </div>
            <div className="formgrid">

                <input ref={width} type="number" min="0" />
                {
                    (!round) ?
                        <>
                            <input ref={height} type="number" min="0" />
                            <label htmlFor="sizeNums">Width x Height</label>
                        </>
                        : <label htmlFor="sizeNums">Width</label>



                }
                <select ref={unit}>
                    <option value="in">inches</option>
                    <option value="cm">centimeters</option>
                </select>
            </div>

            <button type="submit" onClick={handleSize}>Add New Size</button>
        </fieldset>
    )

}

export default SizeForm