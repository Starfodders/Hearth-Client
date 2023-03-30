import axios from 'axios';
import React from 'react';
import { useState } from "react";
import passwordHide from "../../assets/icons/passwordHide.svg"
import passwordShow from "../../assets/icons/passwordShow.svg"


const SignUp = ({toggle, getUser}) => {
        const [passwordHidden, setPasswordHidden] = useState(true)
        const [passwordType, setPasswordType] = useState('password')

//need to build form validation on front end
        const [formValid, setFormValid] = useState(false)
        const [inputFields, setInputFields] = useState({given_name: '', email: '', password: ''})

        function handleInput(e) {
            setInputFields({...inputFields, [e.target.name] : e.target.value})
        }
    
        function toggleShowState() {
            if (!passwordHidden) {
                setPasswordType('password')
            } else {
                setPasswordType('text')
            }
            setPasswordHidden(!passwordHidden)
           
        }

        function handleSubmit(e) {
            e.preventDefault();
            const {given_name, email, password} = inputFields
            axios.post('http://localhost:8080/users/signup', {
                given_name,
                email,
                password
            })
            .then((response) => {
                //sends the new user data up to parent, toggle to login page and populate the fields
                getUser(response.data[0]);
                toggle();
            })
            .catch((error) => {
                console.log(error);
            })
        }

    return (
        <form className = "sign__container" onSubmit = {(e) => handleSubmit(e)}>
            <label htmlFor = "given_name" className = "sign__container--label">First Name</label>
            <input type = "text" name = "given_name" className = "sign__given-name" value = {inputFields.given_name} onChange = {(e)=> handleInput(e)}></input>
            <label htmlFor = "email" className = "sign__container--label">Email Address</label>
            <input type = "text" name = "email" className = "sign__email" value = {inputFields.email} onChange = {(e) => handleInput(e)}></input>
            <label htmlFor = "password" className = "sign__container--label">Password</label>
            <div className = "sign-pw-box">
            <input type = {passwordType} name = "password" className = "sign__password" value = {inputFields.password} onChange = {(e) => handleInput(e)}></input>
            {passwordHidden ? <img src = {passwordShow} className = "sign__pw-icon" onClick = {()=> toggleShowState()}/> : <img src = {passwordHide} className = "sign__pw-icon" onClick = {()=> toggleShowState()}/>}
            </div>
            <button className = "sign__btn">Sign Up</button>
            <p className = "sign__toggle" onClick = {()=> toggle()}>Already have an account? Click here to log in.</p>
        </form>
    );
};

export default SignUp;