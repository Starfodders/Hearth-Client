import "./Options.scss";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const Options = ({ animToggle, animState, soundToggle, soundState, navToUnit }) => {
  const navigate = useNavigate();

  function handleResize() {
    console.log(window.innerWidth);
  }
  useEffect(() => {
    
   window.addEventListener('resize', handleResize);
   return () => window.removeEventListener('resize', handleResize);
  }, [])

  function handleAnimationToggle() {
    animToggle();
  }

  function handleSoundToggle() {
    soundToggle();
  }

  function navigateToUnit() {
    //%20 for spaces
    axios.get(`http://localhost:8080/units/${navToUnit}/all`)
    .then((response) => {
      //replace the spaces in the response with '%20' to match URL string, then navigate there
      const modifyUnitName = response.data[0].name.replace(' ', '%20')
      navigate(`/unit/${modifyUnitName}/${navToUnit}`)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="options">
      <div className="options__sound" onClick={() => handleSoundToggle()}>
        {soundState ? (
          <span className="material-symbols-outlined">check_box</span>
        ) : (
          <span className="material-symbols-outlined">
            check_box_outline_blank
          </span>
        )}
        <p>Toggle Sound</p>
      </div>
      <div
        className="options__animation"
        onClick={() => {
          handleAnimationToggle();
        }}
      >
        {animState ? (
          <span className="material-symbols-outlined">check_box</span>
        ) : (
          <span className="material-symbols-outlined">
            check_box_outline_blank
          </span>
        )}
        <p>Toggle Animation</p>
      </div>
      <div className="options__credits" onClick = {() => navigateToUnit()}>
        <span className="material-symbols-outlined options__credits--icon">line_start_circle</span>
        <p className="options__credits--text">Continue From Recent Progress</p>
      </div>
      <div className="options__credits" onClick = {() => navigate('/credits')}>
        <span className="material-symbols-outlined options__credits--icon">arrow_right_alt</span>
        <p className="options__credits--text">View Credits</p>
      </div>
      <div className="options__credits" onClick = {() => navigate('/feedback')}>
        <span className="material-symbols-outlined options__credits--icon">arrow_right_alt</span>
        <p className="options__credits--text">Submit Feedback</p>
      </div>
    </div>
  );
};

export default Options;
