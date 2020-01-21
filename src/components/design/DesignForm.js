import React, { useContext, useState, useRef, useEffect } from 'react'
import CloudinaryInfo from './CloudinaryInfo'

import FabricForm from '../fabric/FabricForm'
import SizeForm from '../size/SizeForm'

import { DesignContext } from '../providers/DesignProvider'
import { FabricContext } from '../providers/FabricProvider'
import { SizeContext } from '../providers/SizeProvider'


const DesignForm = props => {
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [newDesign] = useState(props.match.path.includes('new'))

    const { fabrics } = useContext(FabricContext)
    const { sizes } = useContext(SizeContext)
    const { getOneDesign, addDesign, editDesign } = useContext(DesignContext)

    const [form, setForm] = useState("")


    const [photoLink, setPhotoLink] = useState("")

    const title = useRef()
    const description = useRef()
    const completedDate = useRef()
    const fabricId = useRef()
    const finishedSizeId = useRef()


    // toggleForm takes an arguement to distinguish between fabric and size forms
    const toggleForm = (formType) => {
        //if the state of form is the same as the formType OR equal to updated then close the form and reset state
        //else change the form that is open
        if (form === formType || formType === "updated") {
            setForm("")
            setLoadingStatus(false)
        } else {
            setForm(formType)
            setLoadingStatus(true)
        }

    }


    const getDesignToEdit = () => {
        console.log(newDesign)
        console.log(fabrics)
        //if the route parameter doesn't include 'new" then it means it's a design to edit
        if (!newDesign) {
            getOneDesign(props.match.params.designId)
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
            finishedSizeId.current.value = 1;
            setLoadingStatus(false)
        }
    }

    useEffect(getDesignToEdit, [])

    //pass into the Fabric Form and the Sizes Form so the new fabric/size will get added to the drop down after the form closes
    const updateFabricDropdownValue = (id) => {
        // update the fabricId to the one that was just added
        fabricId.current.value = id
        
        //close form
        toggleForm("updated")
    }
    
    const updateSizesDropdown = (id) => {
        // update the finishedSizeId to the one that was just added
        finishedSizeId.current.value = id
        //close form
        toggleForm("updated")
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
                addDesign(design)
                    .then(() => props.history.push("/"))
            } else {
                design.id = Number(props.match.params.designId)
                editDesign(design)
                    .then(() => props.history.push("/"))
            }

        }

    }

    return (
        <>
            <form>
                <fieldset>

                    {
                        (newDesign) ? <h2>Create New Design</h2> : <h2>Update Design</h2>
                    }
                    <div className="formgrid">
                        <input type="text" required id="designTitle"
                            ref={title}
                            placeholder="Design Title"
                        />
                        <label htmlFor="designTitle">Title</label>
                    </div>

                    <div className="formgrid">
                        <textarea id="designDescription"
                            ref={description}
                            placeholder="Add information pertaining to floss used, color of fabric, helpful notes, etc."
                        ></textarea>
                        <label htmlFor="designDescription">Description</label>
                    </div>

                    <div className="formgrid">
                        <input type="date" id="designCompleted"
                            ref={completedDate}
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
                    <span className="add--new" onClick={() => toggleForm("fabric")}>Add new fabric</span>
                    {
                        (form === "fabric") ?

                            <FabricForm updateFabricDropdownValue={updateFabricDropdownValue} />
                            :
                            null
                    }
                    <div className="formgrid">
                        <select id="designSize" ref={finishedSizeId}>
                            {
                                sizes.map(fSize => <option key={fSize.id} value={fSize.id}>{fSize.size}</option>)
                            }
                        </select>
                        <label htmlFor="designSize">Finished Size:</label>
                    </div>


                    <span className="add--new" onClick={() => toggleForm("size")}>Add new size</span>
                    {
                        (form === "size") ?

                            <SizeForm updateSizesDropdown={updateSizesDropdown} />
                            :
                            null
                    }

                    <div className="alignRight">
                        <button type="button" disabled={loadingStatus} onClick={newOrUpdatedDesign}>
                            {
                                (newDesign) ? <>Create</> : <>Update</>
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