import React from 'react';
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import fireBase from "../assets/images/yesFire.png"
import BotNav from '../components/BotNav/BotNav';

const HomePage = ({isLoggedIn}) => {
    const navigate = useNavigate()
    const currToken = sessionStorage.getItem('authToken')
    
    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate('/')
    //     }
    // }, [isLoggedIn])
    
    return (
        <div className = "home__container">
            <div className = "home__image">
                <img src = {fireBase}/>
            </div>
            <BotNav/>
            {currToken}
        </div>
    );
};

export default HomePage;