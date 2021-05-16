import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Toast } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addUser, updateUser, clearCurrent } from '../../actions/userActions'
import PropTypes from 'prop-types'
import '../../App.css'

const AddForm = ({ addUser, currentUser, updateUser, clearCurrent}) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("")
    const [error, setError] = useState({
        firstName :'',
        lastName : '',
        age : '',
        gender : '',
    })

    // validation 
    const validation = () => {
        setError({
            firstName: firstName === "",
            lastName: lastName === "",
            age: age === "",
            gender: gender === "",

        })

        return(
            firstName !== '' && lastName !== "" && age !== "" && gender !== ""
        )
    }

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
        
            if (!validation()) return ;      
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
                // alert(`${currentUser.firstName} updated`)
                setToast("true");
                setToastMessage(`${currentUser.firstName} updated`)
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
            handleClose()
            setError({
                firstName : "",
                lastName : "",
                age : "",
                gender : "",
            })
        
    }
    const onChange = e => {
        
        if([e.target.name] == "firstName") {
            setFirstname(e.target.value);
        }
        else if([e.target.name] == "lastName") {
        setLastname(e.target.value);
        }else if([e.target.name] == "age"){
            
            setAge(Number(e.target.value));
        } else if([e.target.name] == "gender") {

            setGender(e.target.value);
        }
        setError({
            ...error,
            [e.target.name]: ""
        })
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
                        <input placeholder="Enter First Name" type='text' name='firstName' value={firstName} onChange={onChange}/>
                        {error.firstName !== ''? "Required" : ""}
                        <p style={{ marginTop: '60px' }}>Age</p>
                        <input placeholder="Enter Age" type='number' name='age' value={age} onChange={onChange}/>
                        {error.age !== ''? "Required" : ""}
                        <br></br>
                    </div>
                    <div className="in2">
                        <p>LastName</p>
                        <input placeholder="Enter Last Name" type='text' name='lastName' value={lastName} onChange={onChange}/>
                        {error.lastName !== ''? "Required" : ""}
                        <div>
                        <p style={{ marginTop: '60px' }}>Gender</p>
                        <input type='radio' name='gender' value='Male' checked={gender==="Male"} onChange={onChange}/>
                        <label htmlFor='male' style={{ marginLeft: '10px' }}> Male</label>
                        <br></br>
                        <input type='radio' name='gender' value='Female'checked={gender==="Female"}  onChange={onChange}/>
                        <label htmlFor='female' style={{ marginLeft: '10px' }}> Female</label>
                        </div>
                        {error.gender !== ''? "Required" : ""}
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


// https://github.com/mounikasantoshi/registerform
// validate = () => {
//     this.setState({
//       errors: {
//         firstName: this.state.data.firstName === "",
//         lastName: this.state.data.lastName === "",
//         age: this.state.data.age === "",
//         gender: this.state.data.gender === "",
//       },
//     });
//     return (
//       this.state.data.firstName !== "" &&
//       this.state.data.lastName !== "" &&
//       this.state.data.age !== "" &&
//       this.state.data.gender !== ""
//     );
//   };
