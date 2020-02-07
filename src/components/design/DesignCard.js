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
                {
                    (currentDesign.photoLink) ?
                        <img className="uploadedImg" src={`${currentDesign.photoLink}`} alt={`${currentDesign.title}`} /> :
                        <img className="defaultImg" src={require('./no-image.png')} alt="default design" />
                }
                {
                    (currentDesign.completedDate !== "") ?
                        <p className="designStatus">{currentDesign.completedDate} </p> :
                        <p className="designStatus">Work In Progress</p>
                }

                <h4 className="designTitle">{currentDesign.title}</h4>
                <ul>

                    <li>Fabric: {`${currentDesign.fabric.type} ${currentDesign.fabric.count} count`}</li>
                    <li>Finished Size: {currentDesign.finishedSize.size}</li>

                    <li>{currentDesign.description}</li>

                </ul>

            </div>
            {
                (currentDesign.userId === Number(currentUser)) ?
                    <div className="designActions">
                        <EditIcon onClick={() => props.history.push(`/design/edit/${currentDesign.id}`)} />
                        <DeleteIcon onClick={() => confirmDelete(currentDesign.id)} />
                    </div> : null
            }
        </div>
    )
}

export default DesignCard