import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode"
import passwordHide from "../../assets/icons/passwordHide.svg"
import passwordShow from "../../assets/icons/passwordShow.svg"
import ErrorIcon from '../ErrorIcon/ErrorIcon'
import "./Login.scss"


const Login = ({toggle, newUser, setIsLoggedIn, setDisplayName, postLogin, postLoginState}) => {
    const navigate = useNavigate();
    const [passwordHidden, setPasswordHidden] = useState(true)
    const [passwordType, setPasswordType] = useState('password')
    const [rememberUser, setRememberUser] = useState(false)

    const [errorMessage, setErrorMessage] = useState('Error')

    const [formValid, setFormValid] = useState(true)
    const [inputFields, setInputFields] = useState({email: '', password: '', blank: ''})
    const [errorFields, setErrorFields] = useState({email: true, password: true, blank: true})


    function toggleShowState() {
        if (!passwordHidden) {
            setPasswordType('password')
        } else {
            setPasswordType('text')
        }
        setPasswordHidden(!passwordHidden)
       
    }

    //checks localStorage if user has a saved email from 'remember' option
    useEffect(() => {
        if (localStorage.getItem('savedUserEmail')) {
            setInputFields({...inputFields, email: localStorage.getItem('savedUserEmail')})
            setRememberUser(true)
        }
    }, [])

    //handles if the user is new, populates the fields with the new account details
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

    function resetField(e) {
        const { name } = e.target
        setErrorFields({...errorFields, [name] : true})
        setFormValid(true)
    }

    function handleLogin(e) {
        e.preventDefault()
        for (const [fieldName, fieldValue] of Object.entries(inputFields)) {
            if (fieldValue.length <= 0) {
                setErrorFields({...errorFields, ...errorFields[fieldName] = false})
                setFormValid(false)
            }
        }
        if (formValid) {
            const {email, password} = inputFields;
            //login, posts to back end to check for an existing account
            axios.post('http://localhost:8080/users/login', {
                email,
                password
            })
            //once successful, set token, set logged in to true, go to home page
            .then(({data}) => {
                postLogin(true)
                if (rememberUser === true) {
                    localStorage.setItem('savedUserEmail', email)
                }
                
                setTimeout(() => {
                    const {token} = data
                    sessionStorage.setItem('authToken', token)
                    const decodedToken = jwt_decode(token)
                    sessionStorage.setItem('currentName', decodedToken.name)
                    sessionStorage.setItem('userId', decodedToken.id)
                    setDisplayName(sessionStorage.getItem('currentName'))

                    setIsLoggedIn(true)
                    navigate('/home')
                }, 5000)
               
            })
            .catch((error) => {
                console.log(error.response.data.message);
                //error is because the element is not false so it doesn't display
                setErrorMessage(error.response.data.message)
            })
        }
    }

    function toggleRemember() {
        setRememberUser((prev) => !prev)
        if (!rememberUser && localStorage.getItem('savedUserEmail')) {
            localStorage.removeItem('savedUserEmail')
        }
    }


    return (
        <>
        <form className = {postLoginState ? "login__container--disappear" : "login__container"} onSubmit = {(e) => handleLogin(e) }>
            <label htmlFor = "email" className = "login__container--label">Email Address</label>
            <input type = "text" name = "email" className = "login__email" value = {inputFields.email} onChange = {(e) => handleInput(e)} onClick = {(e) => resetField(e)}></input>
            <ErrorIcon element = {errorFields.email} message = {errorMessage}/>

            <label htmlFor = "password" className = "login__container--label">Password</label>
            <div className = "login__pw-box">
            <input type = {passwordType} name = "password" className = "login__password" value = {inputFields.password} onChange = {(e) => handleInput(e)} onClick = {(e) => resetField(e)}></input>
            {passwordHidden ? <img src = {passwordShow} className = "login__pw-icon" onClick = {()=> toggleShowState()}/> : <img src = {passwordHide} className = "login__pw-icon" onClick = {()=> toggleShowState()}/>}
            <ErrorIcon element = {errorFields.password} message = {errorMessage}/>

            </div>
            <div className = "login__lower">
                <div className = "login__remember">
                    <input type = "checkbox" name = "remember" className = "login__remember--box" onChange = {() => toggleRemember()} checked = {localStorage.getItem('savedUserEmail')}></input>
                    <label htmlFor = "remember">Remember Me</label>
                </div>
                <p className ="login__reset">Forgot Password</p>
            </div>
            <button className = "login__btn">Log In</button>
            <p className = "login__toggle" onClick = {()=> toggle()}>New to Hearth? Click here to make an account.</p>
        </form>

        </>
    );
};

export default Login;