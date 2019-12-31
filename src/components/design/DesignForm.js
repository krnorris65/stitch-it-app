import React, { useState, useRef, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'
import './styles/DesignForm.css'

import FabricForm from '../fabric/FabricForm'

const DesignForm = props => {
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [fabrics, setFabrics] = useState([])
    const [finishedSizes, setFinishedSizes] = useState([])

    const [toggle, setToggle] = useState(false)
    const [form, setForm] = useState("")


    const [photoLink, setPhotoLink] = useState("")

    const title = useRef()
    const description = useRef()
    const startDate = useRef()
    const completedDate = useRef()
    const fabricId = useRef()
    const finishedSizeId = useRef()

    // toggleForm takes an arguement to distinguish between fabric and size forms
    const toggleForm = (formType) => {
        if (toggle) {
            setToggle(false)
            setForm("")
            setLoadingStatus(false)
        } else {
            setToggle(true)
            setForm(formType)
            setLoadingStatus(true)
        }
    }

    //if a toggle is false (upon page load and when fabric and size forms are closed) then the values of fabrics and finishedSizes will be updated
    const getFabrics = () => {
        if (!toggle) {
            console.log("Update fabric")
            ApiManager.getAll("fabrics")
                .then(fabrics => setFabrics(fabrics))
        }
    }

    const getFinishedSizes = () => {
        if (!toggle) {
            console.log("Update size")
            ApiManager.getAll("finishedSizes")
                .then(finishedSizes => setFinishedSizes(finishedSizes))
        }

    }

    useEffect(getFabrics, [toggle])
    useEffect(getFinishedSizes, [toggle])



    const createNewDesign = () => {
        const design = {
            title: title.current.value,
            description: description.current.value,
            startDate: startDate.current.value,
            completedDate: completedDate.current.value,
            fabricId: Number(fabricId.current.value),
            finishedSizeId: Number(finishedSizeId.current.value),
            userId: Number(localStorage.getItem("currUserId"))
        }

        if (design.title === "" || design.startDate === "") {
            alert("Please fill out a Title and Start Date")
        } else if (design.completedDate !== "" && design.completedDate < design.startDate) {
            alert("Completed date must be later than start date")
        } else {
            setLoadingStatus(true)
            ApiManager.post("designs", design)
                .then(() => props.history.push("/"))

            console.log(design)

        }

    }

    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                            type="text"
                            required
                            ref={title}
                            id="designTitle"
                            placeholder="Design Title"
                        />
                        <label htmlFor="designTitle">Title</label>
                    </div>

                    <div className="formgrid">
                        <input
                            type="date"
                            ref={startDate}
                            id="designStarted"
                        />
                        <label htmlFor="designStarted">Started On:</label>
                    </div>

                    <div className="formgrid">
                        <textarea
                            ref={description}
                            id="designDescription"
                            placeholder="Add information pertaining to floss used, color of fabric, helpful notes, etc."
                        ></textarea>
                        <label htmlFor="designDescription">Description</label>
                    </div>

                    <div className="formgrid">
                        <input
                            type="date"
                            ref={completedDate}
                            id="designCompleted"
                        />
                        <label htmlFor="designCompleted">Completed On:</label>
                    </div>

                    <div className="formgrid">
                        <select id="designFabric" ref={fabricId}>
                            {
                                fabrics.map(fabric => <option key={fabric.id} value={fabric.id}>{fabric.type} {fabric.count} count</option>)
                            }
                        </select>
                        <label htmlFor="designFabric">Fabric:</label>

                    </div>
                    <div className="formgrid">
                        <select id="designSize" ref={finishedSizeId}>
                            {
                                finishedSizes.map(fSize => <option key={fSize.id} value={fSize.id}>{fSize.size}</option>)
                            }
                        </select>
                        <label htmlFor="designSize">Finished Size:</label>
                    </div>

                    <h5>I don't see my fabric : <span onClick={() => toggleForm("fabric")}>Click here to add</span></h5>
                    <h5>I don't see my finished size: <span onClick={() => toggleForm("size")}>Click here to add</span></h5>

                    <div className="alignRight">
                        <button
                            type="button"
                            disabled={loadingStatus}
                            onClick={createNewDesign}
                        >Submit</button>
                    </div>
                </fieldset>
            </form>

            {
                (toggle && form === "fabric") ?
                    <>
                        <h4>Fabric Form</h4>
                        <FabricForm toggleForm={toggleForm} />
                    </> :
                    null
            }
            {
                (toggle && form === "size") ?
                    <>
                        <h4>Size Form</h4>
                        {/* <FabricForm toggleForm={toggleForm}/> */}
                    </> :
                    null
            }

            <button onClick={() => props.history.push("/")}>Back</button>
        </>
    )


}

export default DesignForm