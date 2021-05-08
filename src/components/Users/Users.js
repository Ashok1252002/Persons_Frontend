import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import UserItem from './UserItem'
import PropTypes from 'prop-types'
import { getUsers } from '../../actions/userActions'

const Users = ({ user: {users, loading}, getUsers }) => {

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);


    if(loading || users === null) {
        return <h4>Loading...</h4>
    }

    return (
        <div>
           
            <table>
            <thead>
                <tr>
                <th>id</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>  
            {!loading && users.length === 0 ? (<p>No users to show</p>) : (
                users.map(user => <UserItem  user={user} key={user.id}/>)
            )}
            </tbody>
            </table>    
        </div>
    )
}

Users.propTypes = {
    user: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { getUsers })(Users);
