import React from 'react'


const DesignCard = props => {
    return (
        <div className="card">
            <div className="card-content">
                <h4>{props.design.title}</h4>
                {
                    (props.design.photoLink) ?
                        <img src={`${props.design.photoLink}`} alt={`image of ${props.design.title}`} /> :
                        <img src={require('./defaultDesign.png')} alt="default design" />
                }
                <p>{props.design.description}</p>
                <p>Fabric: {`${props.design.fabric.brand} ${props.design.fabric.count} count (${props.design.fabric.color})`}</p>
                <p>Finished Size: {props.design.finishedSize.size}</p>
                <footer>
                    <span>Last Updated: {props.design.lastUpdated}</span>
                </footer>
            </div>
        </div>
    )
}

export default DesignCard