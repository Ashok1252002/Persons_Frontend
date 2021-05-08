import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../actions/userActions'
import PropTypes from 'prop-types'
import '../App.css'

const Form = ({ addUser }) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const onSubmit = () => {
        if(firstName === '' || lastName === '' || age === '' || gender === '') {
            alert("Please fill the above fields")
        }
        else {
            // console.log(firstName, lastName, age, gender)
            const newUser = {
                firstName,
                lastName,
                age,
                gender
            }
            addUser(newUser);
            alert("New user added")

            // clear fields
            setFirstname('')
            setLastname('')
            setAge('')
            setGender('')
        }
    }

    return (
        <div >
            <div className="details">
            <div>
                <p>FirstName</p>
                <input placeholder="Enter First Name" type='text' name='name' value={firstName} onChange={e => setFirstname(e.target.value)}/>
                <p>Age</p>
                <input placeholder="Enter Age" type='text' name='name' value={age} onChange={e => setAge(e.target.value)}/>
                <br></br>
                {/* <button className="btn" type="submit">Register</button> */}
            </div>
            <div className="in2">
                <p>LastName</p>
                <input placeholder="Enter Last Name" type='text' name='name' value={lastName} onChange={e => setLastname(e.target.value)}/>
                <p>Gender</p>
                <input placeholder="Enter Gender" type='text' name='name' value={gender} onChange={e => setGender(e.target.value)}/>
            </div>
            </div>
            <button className="btn" onClick={onSubmit}>Register</button>
        </div>
        
    )
}

Form.prototype = {
    addUser: PropTypes.func.isRequired,
}

export default connect(null, {addUser})(Form);
