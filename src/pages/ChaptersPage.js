import React from 'react';
import topwave from "../assets/images/top-wave.svg"
import BotNav from '../components/BotNav/BotNav';
import "../styles/ChaptersPage.scss"

const ChaptersPage = () => {
    return (
        <div className = "wrapper">
            <div className = "chapters__bg">
                <img src = {topwave} className = "chapters__bg--img" alt = "moving waves"/>
            </div>
            <BotNav/>
        </div>
    );
};

export default ChaptersPage;