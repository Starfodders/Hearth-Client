import React, { useState } from 'react';
import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const ChapterButton = ({details}) => {
  const {id} = details;
  const navigate = useNavigate();

    return (
        <button className="card__button" onClick = {() => navigate(`/chapters/${id}`)}>
        Click - cht
      </button>
    );
};

export default ChapterButton;