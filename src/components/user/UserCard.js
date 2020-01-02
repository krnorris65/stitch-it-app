import React from 'react'


const UserCard = props => {
    return (
        <div className="card">
            <div className="card-content">
                <h4>{props.user.firstName} {props.user.lastName}</h4>

            </div>
        </div>
    )
}

export default UserCard