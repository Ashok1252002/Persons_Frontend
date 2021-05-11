import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addUser, updateUser, clearCurrent } from '../actions/userActions'
import PropTypes from 'prop-types'
import '../App.css'

const Form = ({ addUser, currentUser, updateUser, clearCurrent}) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    useEffect(() => {
        console.log(currentUser);
        if(currentUser){

            setFirstname(currentUser.firstName)
            setLastname(currentUser.lastName)
            setAge(currentUser.age)
            setGender(currentUser.gender)
        }
        // eslint-disable-next-line
    },[currentUser])

    const onSubmit = () => {
        if(firstName === '' || lastName === '' || age === '' || gender === '') {
            alert("Please fill the above fields")
        }
        else {
            // console.log(firstName, lastName, age, gender)
            if(currentUser) {
                const updUser = {
                    id: currentUser.id,
                    firstName,
                    lastName,
                    age,
                    gender
                }
                updateUser(updUser)
                alert(`${currentUser.firstName} updated`)
                clearCurrent()
            }
            else{
                const newUser = {
                    firstName,
                    lastName,
                    age,
                    gender
                }
                
                addUser(newUser);
                alert("New user added")
            }
            // clear fields
            // setTimeout(function(){window.location.reload();},5);
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
                <input placeholder="Enter Age" type='number' name='name' value={age} onChange={e => setAge(e.target.value)}/>
                <br></br>
                {/* <button className="btn" type="submit">Register</button> */}
            </div>
            <div className="in2">
                <p>LastName</p>
                <input placeholder="Enter Last Name" type='text' name='name' value={lastName} onChange={e => setLastname(e.target.value)}/>
                <p>Gender</p>
                <input type='radio' name='gender' value='Male' onChange={e => setGender(e.target.value)}/>
                <label for='male'> Male</label>
                <br></br>
                <input type='radio' name='gender' value='Female' onChange={e => setGender(e.target.value)}/>
                <label for='female'> Female</label>
            </div>
            </div>
            <button className="btn" onClick={onSubmit}>Register</button>
        </div>
        
    )
}

Form.prototype = {
    addUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    clearCurrent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.users.find(u => u.id === state.user.current)
    }
}

export default connect(mapStateToProps, {addUser, updateUser, clearCurrent})(Form);
