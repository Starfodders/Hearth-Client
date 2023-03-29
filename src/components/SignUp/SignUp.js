import React from 'react';
import { useState } from "react";
import passwordHide from "../../assets/icons/passwordHide.svg"
import passwordShow from "../../assets/icons/passwordShow.svg"


const SignUp = ({toggle}) => {
        const [passwordHidden, setPasswordHidden] = useState(true)
        const [passwordType, setPasswordType] = useState('password')
    
        function toggleShowState() {
            if (!passwordHidden) {
                setPasswordType('password')
            } else {
                setPasswordType('text')
            }
            setPasswordHidden(!passwordHidden)
           
        }

    return (
        <form className = "sign__container">
            <label htmlFor = "given_name" className = "sign__container--label">First Name</label>
            <input type = "text" name = "given_name" className = "sign__given-name"></input>
            <label htmlFor = "email" className = "sign__container--label">Email Address</label>
            <input type = "text" name = "email" className = "sign__email"></input>
            <label htmlFor = "password" className = "sign__container--label">Password</label>
            <div className = "sign-pw-box">
            <input type = {passwordType} name = "password" className = "sign__password"></input>
            {passwordHidden ? <img src = {passwordShow} className = "sign__pw-icon" onClick = {()=> toggleShowState()}/> : <img src = {passwordHide} className = "sign__pw-icon" onClick = {()=> toggleShowState()}/>}
            </div>
            <button className = "sign__btn">Sign Up</button>
            <p className = "sign__toggle" onClick = {()=> toggle()}>Already have an account? Click here to log in.</p>
        </form>
    );
};

export default SignUp;