import React from 'react';
import Card from "../Card/Card"

const Chapters = () => {
    return (
        <div className = "chapters__container">
            <div className = "chapters__header">
                <h1 className = "chapters__title">Chapters</h1>
            </div>
            <div className = "chapters__main">
                <Card/>
            </div>
        </div>
    );
};

export default Chapters;