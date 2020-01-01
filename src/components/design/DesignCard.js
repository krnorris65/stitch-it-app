import React from 'react'


const DesignCard = props => {
    return (
        <div className="card">
            <div className="card-content">
                <h4>{props.design.title}</h4>
                {
                (props.design.completedDate !== "") ?
                <p>Completed On: {props.design.completedDate} </p>:
                <p>Work In Progress</p>
                }
                {
                    (props.design.photoLink) ?
                        <img src={`${props.design.photoLink}`} alt={`${props.design.title}`} /> :
                        <img src={require('./defaultDesign.png')} alt="default design" />
                }
                <p>{props.design.description}</p>
                <p>Fabric: {`${props.design.fabric.type} ${props.design.fabric.count} count`}</p>
                <p>Finished Size: {props.design.finishedSize.size}</p>

                <button onClick={() => props.history.push(`/design/edit/${props.design.id}`)}>Edit</button>



            </div>
        </div>
    )
}

export default DesignCard