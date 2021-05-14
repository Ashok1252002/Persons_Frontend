import React, { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
import { Modal, Button, Form} from 'react-bootstrap'
import { connect } from 'react-redux'
import { addUser, updateUser, clearCurrent } from '../../actions/userActions'
import PropTypes from 'prop-types'
import '../../App.css'

const AddForm = ({ addUser, currentUser, updateUser, clearCurrent}) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    // Modal Control
    const[show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        setFirstname('')
        setLastname('')
        setAge('')
        setGender('');
        clearCurrent();

    }

    // Error validation


    useEffect(() => {
        console.log(currentUser);
        if(currentUser){
            
            setFirstname(currentUser.firstName)
            setLastname(currentUser.lastName)
            setAge(currentUser.age)
            setGender(currentUser.gender)
            setShow(!show)
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
                handleClose()
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
                handleClose()
            }
            // clear fields
            setFirstname('')
            setLastname('')
            setAge('')
            setGender('')
        }
    }

    return (
        <div >
            <h1 style={{ marginLeft: '350px', marginTop: '20px' }}>Data entry form</h1>
            <Button onClick={handleShow}>Add User</Button>
            <Modal style={{ width: "100%" }} show={show} onHide={handleClose} size="lg">
                <Modal.Header >
                        Add User
                </Modal.Header>
                <Modal.Body className="modal-content">
                <div className="details" style={{ width: '360px', height: '350px' }} >
                    <div style={{ marginLeft: "15%" }}>
                        <p>FirstName</p>
                        <input placeholder="Enter First Name" type='text' name='name' value={firstName} onChange={e => setFirstname(e.target.value)}/>
                        <p style={{ marginTop: '60px' }}>Age</p>
                        <input placeholder="Enter Age" type='number' name='name' value={age} onChange={e => setAge(e.target.value)}/>
                        <br></br>
                        {/* <button className="btn" type="submit">Register</button> */}
                    </div>
                    <div className="in2">
                        <p>LastName</p>
                        <input placeholder="Enter Last Name" type='text' name='name' value={lastName} onChange={e => setLastname(e.target.value)}/>
                        <p style={{ marginTop: '60px' }}>Gender</p>
                        <input type='radio' name='gender' value='Male' checked={gender=="Male"} onChange={e => setGender(e.target.value)}/>
                        <label htmlFor='male' style={{ marginLeft: '10px' }}> Male</label>
                        <br></br>
                        <input type='radio' name='gender' value='Female'checked={gender=="Female"}  onChange={e => setGender(e.target.value)}/>
                        <label htmlFor='female' style={{ marginLeft: '10px' }}> Female</label>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    {currentUser ? <Button className="btn" variant='success' onClick={onSubmit} block style={{ marginRight: "10px" }}>Update User</Button> : 
                        <Button className="btn" variant='success' onClick={onSubmit} block>Add New User</Button> }
                    <Button className="btn btn-primary" variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
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

export default connect(mapStateToProps, {addUser, updateUser, clearCurrent})(AddForm);
