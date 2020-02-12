import React, { useContext, useState, useRef, useEffect } from 'react'
import CloudinaryInfo from './CloudinaryInfo'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';

import FabricForm from '../fabric/FabricForm'
import SizeForm from '../size/SizeForm'

import { DesignContext } from '../providers/DesignProvider'
import { FabricContext } from '../providers/FabricProvider'
import { SizeContext } from '../providers/SizeProvider'




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
        // backgroundColor: `cornsilk`,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 2, 3),
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

    const { fabrics } = useContext(FabricContext)
    const { sizes } = useContext(SizeContext)
    const { getOneDesign, addDesign, editDesign } = useContext(DesignContext)

    const [photoLink, setPhotoLink] = useState("")

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
        handleClose()
    }

    const updateSizesDropdown = (id) => {
        // update the finishedSizeId to the one that was just added
        finishedSizeId.current.value = id
        //close form
        handleClose()
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
        <article className="designEl">
            <div className="formBkgd">
                <CloseIcon className="iconRight" onClick={() => props.history.push("/")} />
                {
                    (newDesign) ? <h2>Create New Design</h2> : <h2>Update Design</h2>
                }
                <form>
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

                    <div className="alignRight">
                        <button type="button" disabled={loadingStatus} onClick={newOrUpdatedDesign}>
                            {
                                (newDesign) ? <>Create</> : <>Update</>
                            }
                        </button>
                    </div>
                </form>

                {
                    (photoLink === "") ?
                        <section className="photoActions">
                            <AddAPhotoIcon onClick={uploadWidget} className="upload-button" />
                            <p>Add Photo</p>
                        </section>
                        :
                        <>
                            <section className="photoActions">
                                <RemoveCircleIcon onClick={() => setPhotoLink("")} />
                                <p>Remove Photo</p>
                            </section>
                            <img className="uploadImage" src={photoLink} alt="" />
                        </>

                }
            </div>
        </article>
    )


}

export default DesignForm