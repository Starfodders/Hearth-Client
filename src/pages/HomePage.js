import React from 'react';
import fireBase from "../assets/images/yesFire.png"
import BotNav from '../components/BotNav/BotNav';

const HomePage = () => {
    return (
        <div className = "home__container">
            <div className = "home__image">
                <img src = {fireBase}/>
            </div>
            <BotNav/>
        </div>
    );
};

export default HomePage;