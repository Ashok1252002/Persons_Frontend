import React from 'react'
import PropTypes from 'prop-types'
import '../../App.css'

const UserItem = ({ user }) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td><button className="btn1">Edit</button></td>
            <td><button className="btn2">Delete</button></td>

        </tr>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem;
