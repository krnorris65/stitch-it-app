import React, {useContext, useState} from 'react'
import {DesignContext} from '../providers/DesignProvider'


const DesignCard = props => {
    const {deleteDesign} = useContext(DesignContext)
    const [currentDesign] = useState(props.design)
    return (
        <div className="card">
            <div className="card-content">
                <h4>{currentDesign.title}</h4>
                {
                (currentDesign.completedDate !== "") ?
                <p>Completed On: {currentDesign.completedDate} </p>:
                <p>Work In Progress</p>
                }
                {
                    (currentDesign.photoLink) ?
                        <img src={`${currentDesign.photoLink}`} alt={`${currentDesign.title}`} /> :
                        <img src={require('./defaultDesign.png')} alt="default design" />
                }
                <p>{currentDesign.description}</p>
                <p>Fabric: {`${currentDesign.fabric.type} ${currentDesign.fabric.count} count`}</p>
                <p>Finished Size: {currentDesign.finishedSize.size}</p>

                <button onClick={() => props.history.push(`/design/edit/${currentDesign.id}`)}>Edit</button>
                <button onClick={() => deleteDesign(currentDesign.id)}>Delete</button>

            </div>
        </div>
    )
}

export default DesignCard