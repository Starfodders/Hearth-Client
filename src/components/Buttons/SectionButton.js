import React, { useState } from 'react';
import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const SectionButton = ({details}) => {
    const {name, id} = details
  const navigate = useNavigate();

    return (
        <button className="card__button" onClick = {() => navigate(`/chapters/${name}/${id}`)}>
                Continue

      </button>
    );
};

export default SectionButton;