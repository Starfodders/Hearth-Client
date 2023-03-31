import React from 'react';
import topwave from "../assets/images/top-wave.svg"
import "../styles/ChaptersPage.scss"
import Chapters from "../components/Chapters/Chapters"

const ChaptersPage = () => {
    return (
        <div className = "wrapper">
            <div className = "chapters__bg">
                <img src = {topwave} className = "chapters__bg--img" alt = "moving waves"/>
            </div>
            {<Chapters/>}
        </div>
    );
};

export default ChaptersPage;