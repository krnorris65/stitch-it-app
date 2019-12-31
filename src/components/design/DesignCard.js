import React from 'react'


const DesignCard = props => {
    return (
        <div className="card">
            <div className="card-content">
                <h4>{props.design.title}</h4>
                {
                    (props.design.photoLink) ?
                        <img src={`${props.design.photoLink}`} /> :
                        <img src={require('./defaultDesign.png')} alt="default design" />
                }
                <p>{props.design.description}</p>
            </div>
        </div>
    )
}