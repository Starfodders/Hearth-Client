import React, { useState } from 'react';
import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const UnitButton = ({details}) => {
    const {name, id} = details
  const navigate = useNavigate();

    return (
        <button className="card__button" onClick = {() => navigate(`/chapters/${name}/${id}`)}>
        Click - unit
      </button>
    );
};

export default UnitButton;