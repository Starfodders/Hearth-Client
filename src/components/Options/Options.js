import "./Options.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Options = ({ animToggle, animState, soundToggle, soundState, setTutorial }) => {
  const navigate = useNavigate();

  //toggle the options appearance based on window size (collapsed on 1024px)
  const [optionExpand, setOptionExpand] = useState(
    window.innerWidth >= 1024 ? true : false
  );

  function handleResize() {
    if (window.innerWidth <= 1024 && optionExpand) {
      setOptionExpand(false);
      window.removeEventListener("resize", handleResize);
    } else if (window.innerWidth > 1024 && !optionExpand) {
      setOptionExpand(true);
      window.removeEventListener("resize", handleResize);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, );

  function handleAnimationToggle() {
    animToggle();
  }

  function handleSoundToggle() {
    soundToggle();
  }

  return (
    <>
      {optionExpand ? (
        <div className="options">
          <div className="options__left" onClick={() => setOptionExpand(false)}>
            <span className="material-symbols-outlined options__expand--arrow">
              chevron_right
            </span>
          </div>
          <div className="options__right">
            <section className="options__upper">
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
            </section>
            <section className="options__lower">
            <div
              className="options__credits"
              onClick={() => navigate("/credits")}
            >
              <span className="material-symbols-outlined options__credits--icon">
                arrow_right_alt
              </span>
              <p className="options__credits--text">View Credits</p>
            </div>
            <div
              className="options__credits"
              onClick={() => navigate("/feedback")}
            >
              <span className="material-symbols-outlined options__credits--icon">
                arrow_right_alt
              </span>
              <p className="options__credits--text">Submit Feedback</p>
            </div>
            <div
              className="options__credits"
              onClick={() => setTutorial(true)}
            >
              <span className="material-symbols-outlined options__credits--icon">
                arrow_right_alt
              </span>
              <p className="options__credits--text">Open Tutorial</p>
            </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="options__expand" onClick={() => setOptionExpand(true)}>
          <span className="material-symbols-outlined options__expand--icon">
            chevron_left
          </span>
          <span className="material-symbols-outlined options__expand--icon">settings</span>
          <p className="options__expand--header">Options</p>
          
        </div>
      )}
    </>
  );
};

export default Options;
