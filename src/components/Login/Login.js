import React from 'react';
import { useState } from "react";
import passwordHide from "../../assets/icons/passwordHide.svg"
import passwordShow from "../../assets/icons/passwordShow.svg"


const Login = ({toggle}) => {
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
        <form className = "login__container">
            <label htmlFor = "email" className = "login__container--label">Email Address</label>
            <input type = "text" name = "email" className = "login__email"></input>
            <label htmlFor = "password" className = "login__container--label">Password</label>
            <div className = "login__pw-box">
            <input type = {passwordType} name = "password" className = "login__password"></input>
            {passwordHidden ? <img src = {passwordShow} className = "login__pw-icon" onClick = {()=> toggleShowState()}/> : <img src = {passwordHide} className = "login__pw-icon" onClick = {()=> toggleShowState()}/>}
            </div>
            <div className = "login__lower">
                <div className = "login__remember">
                    <input type = "checkbox" name = "remember"></input>
                    <label htmlFor = "remember">Remember Me</label>
                </div>
                <p className ="login__reset">Forgot Password</p>
            </div>
            <button className = "login__btn">Log In</button>
            <p className = "login__toggle" onClick = {()=> toggle()}>New to here? Click here to make an account</p>
        </form>
    );
};

export default Login;