import React, { useRef, useState, useContext } from 'react'
import { SizeContext } from '../providers/SizeProvider'
import CloseIcon from '@material-ui/icons/Close';


const SizeForm = props => {

    const [round, setRound] = useState(false)


    const width = useRef()
    const height = useRef()
    const unit = useRef()

    const { findSizeId, addSize } = useContext(SizeContext)

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
        <article className="sub-form size-form designEl">
            <div className="formBkgd">
                <CloseIcon className="iconRight" onClick={props.handleClose} />

                <h3>New Size</h3>
                <div className="formgrid">
                    <div className="dimensions">
                    <label htmlFor="round">Round Design</label>
                        <input type="checkbox" checked={round} onChange={() => round ? setRound(false) : setRound(true)} />
                    </div>
                    {/* <span>If your design is oval do not check</span> */}
                </div>
                <div className="formgrid">
                    <label htmlFor="size">Dimensions</label>
                    <div className="dimensions">
                        <input ref={width} type="number" min="0" placeholder="Width" />
                        {
                            (!round) ?
                                <>
                                    <span>x</span>
                                    <input ref={height} type="number" min="0" placeholder="Height" />
                                </>
                                : null



                        }
                        <select ref={unit}>
                            <option value="in">inches</option>
                            <option value="cm">centimeters</option>
                        </select>
                    </div>
                </div>
                {/* <div className="formgrid">
                    {
                        (!round) ?
                            <>
                                <label htmlFor="sizeNums">Width x Height</label>
                                <input ref={height} type="number" min="0" />
                                <span>x</span>
                            </>
                            : <label htmlFor="sizeNums">Width</label>



                    }
                    <input ref={width} type="number" min="0" />
                    <select ref={unit}>
                        <option value="in">inches</option>
                        <option value="cm">centimeters</option>
                    </select>
                </div> */}

                <div className="alignRight">
                    <button className="formBtn" type="submit" onClick={handleSize}>Add New</button>
                </div>
            </div>
        </article >
    )

}

export default SizeForm