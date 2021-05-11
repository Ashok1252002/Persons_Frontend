import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteUser, setCurrent } from '../../actions/userActions'
import '../../App.css'

const UserItem = ({ user, deleteUser, setCurrent }) => {
    const onDelete = () => {
        deleteUser(user.id)
        alert(`${user.firstName} deleted`)
    }
    const onClick = () => {
        // console.log(user)
        setCurrent(user.id);
    }


    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td><button className="btn1" onClick={onClick}>Edit</button></td>
            <td><button className="btn2" onClick={onDelete}>Delete</button></td>

        </tr>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    // updateUser: PropTypes.func.isRequired,
    // current: PropTypes.object,
}
// const mapStateToProps = state => {
//     return{
//         current: state.user.current
//     }
// }

export default connect(null, { deleteUser,setCurrent })(UserItem);
