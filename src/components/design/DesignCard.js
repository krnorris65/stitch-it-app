import React from 'react'


const DesignCard = props => {
    return (
        <div className="card">
            <div className="card-content">
                <h4>{props.design.title}</h4>
                {
                    (props.design.photoLink) ?
                        <img src={`${props.design.photoLink}`} alt={`${props.design.title}`} /> :
                        <img src={require('./defaultDesign.png')} alt="default design" />
                }
                <p>{props.design.description}</p>
                <p>Aida Fabric: {`${props.design.fabric.count} count`}</p>
                <p>Finished Size: {props.design.finishedSize.size}</p>
                <footer>
                    <span>Started On: {props.design.startDate}</span>
                    <span>Completed On: {props.design.completedDate}</span>
                </footer>
            </div>
        </div>
    )
}

export default DesignCard