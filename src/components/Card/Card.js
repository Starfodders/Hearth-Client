import "./Card.scss"
import ProgressBar from '../ProgressBar/ProgressBar';
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"


import React from 'react';

const Card = ({details, change}) => {
    const location = useLocation()
    const navigate = useNavigate();
    
    function handleIDChange() {
        change(details.id)
        navigate(`${location.pathname}/${details.id}`)
    }
    
    return (
        <div className = "card__container">
            <h2 className = "card__name">{details.name}</h2>
            <img src = {`http://localhost:8080${details.images}`} alt = {details.name} className = "card__image"/>
            <ProgressBar/>
            <button className = "card__button" onClick = {() => handleIDChange()}>Click</button>
        </div>
    );
};

export default Card;



// const Card = ({id, name, sections, available, images, depth}) => {
//     const navigate = useNavigate();
//     const [ isAvailable, setIsAvailable ] = useState(false);

//     useEffect(() => {
//         if (available) {
//             if (available === 1) {
//                 setIsAvailable(true)
//             } else {
//                 setIsAvailable(false)
//             }
//         }
//     }, [available])

//     function handleClick(id) {
//         navigate(`/chapters/${id}`)
//     }

    // return (
    //     <div key = {id} className = {isAvailable ? "card__container" : "card__container__off"}>
    //         <h2 className = "card__name">{name}</h2>
    //         <img src = {`http://localhost:8080${images}`} alt = {name} className = "card__image"/>
    //         <ProgressBar/>
    //         <button className = "card__button" onClick = {() => handleClick(id)}>{isAvailable ? 'Continue' : 'Unavailable'}</button>
    //     </div>
    // );
// };

// export default Card;