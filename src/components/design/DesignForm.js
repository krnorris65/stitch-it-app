import React, { useContext, useState, useRef, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

import FabricForm from '../fabric/FabricForm'
import SizeForm from '../size/SizeForm'

import { DesignContext } from '../providers/DesignProvider'
import { FabricContext } from '../providers/FabricProvider'
import { SizeContext } from '../providers/SizeProvider'

import "../styles/Form.css"

function getModalStyle() {
    const top = 40;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        outline: 'none',
    },
}));

const DesignForm = props => {
    //needed for Modals
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [openFabric, setFabricOpen] = React.useState(false);
    const [openSize, setSizeOpen] = React.useState(false);

    const [loadingStatus, setLoadingStatus] = useState(true)
    const [newDesign] = useState(props.match.path.includes('new'))
    const [editAllowed, setEditAllowed] = useState(true)

    const { fabrics } = useContext(FabricContext)
    const { sizes } = useContext(SizeContext)
    const { getOneDesign, addDesign, editDesign } = useContext(DesignContext)

    const [photo, setPhoto] = useState("")
    // used so the user can preview the photo they selected to upload
    const [photoPreview, setPhotoPreview] = useState("")

    const title = useRef()
    const description = useRef()
    const completedDate = useRef()
    const fabricId = useRef()
    const finishedSizeId = useRef()

    const handleOpen = (form) => {
        if (form === "fabric") {
            setFabricOpen(true);
        } else if (form === "size") {
            setSizeOpen(true);
        }
    };

    const handleClose = () => {
        setFabricOpen(false);
        setSizeOpen(false);
    };

    const getDesignToEdit = () => {
        //if the route parameter doesn't include 'new" then it means it's a design to edit
        if (!newDesign) {
            getOneDesign(props.match.params.designId)
                .then(editDesign => {
                    setLoadingStatus(false)

                    // if the user manually types in the path to try to edit someone elses design it won't present the user with the form
                    if (editDesign.stitcher_id !== Number(localStorage.getItem("stitcher_id"))) {
                        setEditAllowed(false)
                    } else {
                        title.current.value = editDesign.title
                        description.current.value = editDesign.description
                        completedDate.current.value = editDesign.completed_date
                        fabricId.current.value = editDesign.fabric_id
                        finishedSizeId.current.value = editDesign.size_id
                        console.log(editDesign.photo)
                        if (editDesign.photo !== null) {
                            setPhoto(editDesign.photo)
                        }
                    }
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
        handleClose()
    }

    const updateSizesDropdown = (id) => {
        // update the finishedSizeId to the one that was just added
        finishedSizeId.current.value = id
        //close form
        handleClose()
    }

    const handleFileUpload = e => {
        setPhoto(e.target.files[0])
        // allow user to preview the photo they selected
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => setPhotoPreview(reader.result)
    };


    const newOrUpdatedDesign = () => {

        if (title.current.value === "") {
            alert("Please fill out a Title")
        } else {
            const formData = new FormData()
            formData.append('title', title.current.value)
            formData.append('description', description.current.value)
            formData.append('completed_date', completedDate.current.value)
            formData.append('fabric_id', Number(fabricId.current.value))
            formData.append('size_id', Number(finishedSizeId.current.value))
            // if imageFile is not "" then a new photo has been uploaded
            console.log(typeof (photo))
            if (typeof (photo) !== 'string') {
                formData.append('photo', photo, photo.name)
            } else if (photo === "" && photo.imageUrl !== "") {
                //if  imageFile is an empty string and the imageUrl is not "", then a photo was uploaded previously and hasn't changed
                formData.append('photo', photo.imageUrl)
            } else {
                //else send an empty string
                formData.append('photo', "")
            }
            setLoadingStatus(true)
            if (newDesign) {
                addDesign(formData)
                    .then(() => props.history.push("/"))
            } else {
                const designId = Number(props.match.params.designId)
                editDesign(designId, formData)
                    .then(() => props.history.push("/"))
            }

        }

    }

    return (
        <article className="formEl">
            {editAllowed ?
                <div className="formBkgd">
                    <CloseIcon className="iconRight" onClick={() => props.history.push("/")} />
                    {
                        (newDesign) ? <h2>Create New Design</h2> : <h2>Update Design</h2>
                    }
                    <div className="formgrid">
                        <label htmlFor="designTitle">Title:</label>
                        <input type="text" required id="designTitle"
                            ref={title}
                            placeholder="Design Title"
                        />
                    </div>

                    <div className="formgrid">
                        <label htmlFor="designDescription">Description:</label>
                        <textarea id="designDescription"
                            ref={description}
                            placeholder="Add information pertaining to floss used, color of fabric, helpful notes, etc."
                            maxLength="150"
                            rows="3"
                        ></textarea>

                    </div>

                    <div className="formgrid">
                        <label htmlFor="designCompleted">Completed On:</label>
                        <input type="date" id="designCompleted"
                            ref={completedDate}
                        />

                    </div>

                    <div className="formgrid">
                        <label htmlFor="designFabric">Fabric:</label>

                        <select id="designFabric" ref={fabricId}>
                            {
                                fabrics.map(fabric => <option key={fabric.id} value={fabric.id}>{fabric.type} {fabric.count} count</option>)
                            }
                        </select>

                        <span className="add--new" onClick={() => handleOpen("fabric")}>Add New Fabric</span>
                    </div>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={openFabric}
                        onClose={handleClose}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <FabricForm updateFabricDropdownValue={updateFabricDropdownValue} handleClose={handleClose} />
                        </div>

                    </Modal>

                    <div className="formgrid">
                        <label htmlFor="designSize">Finished Size:</label>

                        <select id="designSize" ref={finishedSizeId}>
                            {
                                sizes.map(fSize => <option key={fSize.id} value={fSize.id}>{fSize.size}</option>)
                            }
                        </select>

                        <span className="add--new" onClick={() => handleOpen("size")}>Add New Size</span>
                    </div>


                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={openSize}
                        onClose={handleClose}
                    >
                        <div style={modalStyle} className={classes.paper}>

                            <SizeForm updateSizesDropdown={updateSizesDropdown} handleClose={handleClose} />
                        </div>
                    </Modal>



                    <div className="formgrid">
                        <label>Design Photo:</label>
                        {
                            (photo === "") ?
                                <>
                                    <input
                                        type='file'
                                        id='customFile'
                                        onChange={handleFileUpload}
                                    />

                                </>
                                : <span className="add--new photo--action" onClick={() => {
                                    setPhoto("")
                                }}>Remove Photo</span>

                        }
                        {
                            (photo !== "" && typeof (photo) === 'string') ?
                                <img className="uploadImage" src={photo} alt="" />
                                : null
                        }
                                                {
                            (typeof (photo) !== 'string') ?
                                <>
                                    <img id="photoPreview" className="uploadImage" src={photoPreview} />
                                    <span>{photo.name}</span>

                                </>
                                : null
                        }

                    </div>

                    <div className="alignRight">
                        <button className="formBtn" type="button" disabled={loadingStatus} onClick={newOrUpdatedDesign}>
                            {
                                (newDesign) ? <>Create</> : <>Update</>
                            }
                        </button>
                    </div>
                </div>
                :
                <div className="formBkgd">
                    <h2>You do not have permission to edit this design</h2>
                </div>
            }
        </article>
    )


}

export default DesignForm