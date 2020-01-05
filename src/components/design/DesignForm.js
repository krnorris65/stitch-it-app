import React, { useState, useRef, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'

import CloudinaryInfo from './CloudinaryInfo'

import FabricForm from '../fabric/FabricForm'
import SizeForm from '../size/SizeForm'

const DesignForm = props => {
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [newDesign] = useState(props.match.path.includes('new'))
    const [fabrics, setFabrics] = useState([])
    const [finishedSizes, setFinishedSizes] = useState([])

    const [toggle, setToggle] = useState(false)
    const [form, setForm] = useState("")


    const [photoLink, setPhotoLink] = useState("")

    const title = useRef()
    const description = useRef()
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

    const getFabricsAndSizes = () => {
        ApiManager.getAll("fabrics")
            .then(fabrics => setFabrics(fabrics))
        ApiManager.getAll("finishedSizes")
            .then(finishedSizes => {
                setFinishedSizes(finishedSizes)
                //default value of the dropdown is the unknown size
                const unknownId = finishedSizes.find(size => size.size === "unknown").id
                finishedSizeId.current.value = unknownId
            })
    }


    const getDesignToEdit = () => {
        //if the route parameter doesn't include 'new" then it means it's a design to edit
        if (!newDesign) {
            ApiManager.getOne("designs", props.match.params.designId)
                .then(editDesign => {
                    setLoadingStatus(false)

                    title.current.value = editDesign.title
                    description.current.value = editDesign.description
                    completedDate.current.value = editDesign.completedDate
                    fabricId.current.value = editDesign.fabricId
                    finishedSizeId.current.value = editDesign.finishedSizeId

                    setPhotoLink(editDesign.photoLink)

                })
        } else {
            setLoadingStatus(false)
        }
    }

    useEffect(getFabricsAndSizes, [])
    useEffect(getDesignToEdit, [])

    //pass into the Fabric Form and the Sizes Form so the new fabric/size will get added to the drop down after the form closes
    const updateFabricDropdown = (id, status) => {
        // if the status is update then the fabric already exists so a new fabric wasn't added to the database
        //a getAll only needs to be done when a new fabric has been added
        if (status === "update") {
            fabricId.current.value = id
        } else {
            ApiManager.getAll("fabrics")
                .then(fabrics => setFabrics(fabrics))
                .then(() => fabricId.current.value = id)
        }
        //close form
        toggleForm()
    }

    const updateSizesDropdown = (id, status) => {
        // if the status is update then the size already exists so a new size wasn't added to the database
        //a getAll only needs to be done when a new size has been added
        if (status === "update") {
            finishedSizeId.current.value = id
        } else {
            ApiManager.getAll("finishedSizes")
                .then(finishedSizes => setFinishedSizes(finishedSizes))
                .then(() => finishedSizeId.current.value = id)
        }
        //close form
        toggleForm()
    }

    //method that opens the cloudinary widget and sets the secure_url from the result as the photoLink
    const uploadWidget = () => {

        window.cloudinary.openUploadWidget({ cloud_name: `${CloudinaryInfo.cloud_name}`, upload_preset: `${CloudinaryInfo.upload_preset}`, tags: ['cross stitch'] },
            (error, result) => {

                if (result !== undefined) {
                    // change state so that the imageUrl property will contain the URL of the uploaded image
                    setPhotoLink(`${result[0].secure_url}`)
                }
            });
    }



    const newOrUpdatedDesign = () => {
        const design = {
            title: title.current.value,
            description: description.current.value,
            completedDate: completedDate.current.value,
            photoLink: photoLink,
            fabricId: Number(fabricId.current.value),
            finishedSizeId: Number(finishedSizeId.current.value),
            userId: Number(localStorage.getItem("currUserId"))
        }

        if (design.title === "") {
            alert("Please fill out a Title")
        } else {
            setLoadingStatus(true)
            if (newDesign) {
                ApiManager.post("designs", design)
                    .then(() => props.history.push("/"))
            } else {
                design.id = Number(props.match.params.designId)
                ApiManager.update("designs", design)
                    .then(() => props.history.push("/"))
            }

        }

    }

    return (
        <>
            <form>
                <fieldset>

                    {
                        (newDesign) ?
                            <h2>Create New Design</h2> :
                            <h2>Update Design</h2>
                    }
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
                    <h5>I don't see my fabric : <span onClick={() => toggleForm("fabric")}>Click here to add</span></h5>
                    {
                        (form === "fabric") ?

                            <FabricForm updateFabricDropdown={updateFabricDropdown} />
                            :
                            null
                    }
                    <div className="formgrid">
                        <select id="designSize" ref={finishedSizeId}>
                            {
                                finishedSizes.map(fSize => <option key={fSize.id} value={fSize.id}>{fSize.size}</option>)
                            }
                        </select>
                        <label htmlFor="designSize">Finished Size:</label>
                    </div>


                    <h5>I don't see my finished size: <span onClick={() => toggleForm("size")}>Click here to add</span></h5>
                    {
                        (form === "size") ?

                            <SizeForm updateSizesDropdown={updateSizesDropdown} />
                            :
                            null
                    }

                    <div className="alignRight">
                        <button
                            type="button"
                            disabled={loadingStatus}
                            onClick={newOrUpdatedDesign}
                        >
                            {
                                (newDesign) ?
                                    <>Create</> :
                                    <>Update</>
                            }
                        </button>
                    </div>
                </fieldset>
            </form>

            <img className="uploadImage" src={photoLink} alt="" />
            <div className="alignRight">
                {
                    (photoLink === "") ?
                        <button onClick={uploadWidget} className="upload-button">Add Image</button>
                        :
                        <button onClick={() => setPhotoLink("")} >Delete Photo</button>
                }
            </div>




            <button onClick={() => props.history.push("/")}>Back</button>
        </>
    )


}

export default DesignForm