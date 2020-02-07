import React, { useContext, useState } from 'react'
import { DesignContext } from '../providers/DesignProvider'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



const DesignCard = props => {
    const { deleteDesign } = useContext(DesignContext)
    const [currentDesign] = useState(props.design)
    const [currentUser] = localStorage.getItem("currUserId")

    const confirmDelete = (id) => {
        const userConfirm = window.confirm("Are you sure you want to delete this design?")
        if (userConfirm) {
            deleteDesign(id)
        }
    }


    return (
        <div className="card">
            <div className="card-content">
                <h4>{currentDesign.title}</h4>
                {
                    (currentDesign.completedDate !== "") ?
                        <p>Completed On: {currentDesign.completedDate} </p> :
                        <p>Work In Progress</p>
                }
                {
                    (currentDesign.photoLink) ?
                        <img className="uploadedImg" src={`${currentDesign.photoLink}`} alt={`${currentDesign.title}`} /> :
                        <img className="defaultImg" src={require('./no-image.png')} alt="default design" />
                }
                <p>{currentDesign.description}</p>
                <p>Fabric: {`${currentDesign.fabric.type} ${currentDesign.fabric.count} count`}</p>
                <p>Finished Size: {currentDesign.finishedSize.size}</p>
                {
                    (currentDesign.userId === Number(currentUser)) ?
                        <>
                            <EditIcon onClick={() => props.history.push(`/design/edit/${currentDesign.id}`)} />
                            <DeleteIcon onClick={() => confirmDelete(currentDesign.id)} />
                        </> : null
                }

            </div>
        </div>
    )
}

export default DesignCard