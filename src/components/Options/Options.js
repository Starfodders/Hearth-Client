import React from "react";
import "./Options.scss"

const Options = ({animToggle, animState, soundToggle, soundState}) => {

    function handleAnimationToggle() {
        animToggle()
    }

    function handleSoundToggle() {
        soundToggle()
    }

  return (
    <div className="options">
      <div
        className="options__sound"
        onClick={() => handleSoundToggle()}
      >
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
    </div>
  );
};

export default Options;
