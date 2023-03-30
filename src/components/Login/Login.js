import React from 'react';
import { useState, useEffect } from "react";
import passwordHide from "../../assets/icons/passwordHide.svg"
import passwordShow from "../../assets/icons/passwordShow.svg"
import "./Login.scss"


const Login = ({toggle, newUser}) => {
    const [passwordHidden, setPasswordHidden] = useState(true)
    const [passwordType, setPasswordType] = useState('password')

    const [formValid, setFormValid] = useState(false)
    const [inputFields, setInputFields] = useState({email: '', password: ''})

    function toggleShowState() {
        if (!passwordHidden) {
            setPasswordType('password')
        } else {
            setPasswordType('text')
        }
        setPasswordHidden(!passwordHidden)
       
    }

    useEffect(() => {
        if (Object.keys(newUser).length > 0) {
            console.log(newUser);
            //if new user exists (redirect from Sign Up), then populate these fields
            setInputFields({...inputFields, email: newUser.email, password: newUser.password})
        }
    }, [newUser])
    
    function handleInput(e) {
        setInputFields({...inputFields, [e.target.name] : e.target.value})
    }


    return (
        <form className = "login__container">
            <label htmlFor = "email" className = "login__container--label">Email Address</label>
            <input type = "text" name = "email" className = "login__email" value = {inputFields.email} onChange = {(e) => handleInput(e)}></input>
            <label htmlFor = "password" className = "login__container--label">Password</label>
            <div className = "login__pw-box">
            <input type = {passwordType} name = "password" className = "login__password" value = {inputFields.password} onChange = {(e) => handleInput(e)}></input>
            {passwordHidden ? <img src = {passwordShow} className = "login__pw-icon" onClick = {()=> toggleShowState()}/> : <img src = {passwordHide} className = "login__pw-icon" onClick = {()=> toggleShowState()}/>}
            </div>
            <div className = "login__lower">
                <div className = "login__remember">
                    <input type = "checkbox" name = "remember" className = "login__remember--box"></input>
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