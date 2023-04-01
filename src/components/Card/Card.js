import React from 'react';

const Card = ({id, name, sections, available, images}) => {

    return (
        <div key = {id}>
            {name}
            {sections}
            {available}
            <img src = {`http://localhost:8080${images}`} alt = {images}/>
        </div>
    );
};

export default Card;