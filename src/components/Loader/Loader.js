import React from 'react';
import loaderGif from "../../assets/images/mascot.gif"
import "./Loader.scss"

const Loader = () => {
    return (
        <div className = "loader__container">
            <img src = {loaderGif} className = "loader__img" alt = ""/>
        </div>
    );
};

export default Loader;