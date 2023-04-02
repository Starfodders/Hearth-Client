import React, { useState } from 'react';
import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const UnitButton = ({details}) => {
  const {name, id} = details
  const navigate = useNavigate();

  function test() {
    console.log(name);
    console.log(id);
  }

    return (
        <button className="card__button" onClick = {() =>  navigate(`/unit/${name}/${id}`)}>
        Click - unit
      </button>
    );
};

export default UnitButton;


//current click gets the unit id + name of unit