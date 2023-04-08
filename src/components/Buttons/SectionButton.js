import React, { useState } from 'react';
import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const SectionButton = ({details}) => {
  const {name, id, available} = details
  const navigate = useNavigate();

    return (
        <button className={available ? "card__button": "card__button--disabled"} onClick = {() => navigate(`/chapters/units/${id}`)}>
                {available ? 'Continue' : 'Locked'}
      </button>
    );
};

export default SectionButton;