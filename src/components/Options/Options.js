import "./Options.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Options = ({
  animToggle,
  animState,
  soundToggle,
  soundState,
  setTutorial,
}) => {
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
  });

  function handleAnimationToggle() {
    animToggle();
  }

  function handleSoundToggle() {
    soundToggle();
  }

  return (
    <>
      {optionExpand ? (
        <section className="options">
          <div className="options__left" onClick={() => setOptionExpand(false)}>
            <span
              className="material-symbols-outlined options__expand--arrow"
              aria-label="Collapse Options Panel"
            >
              <span aria-hidden="true">chevron_right</span>
            </span>
          </div>
          <div className="options__right">
            <section className="options__upper">
              <div
                className="options__sound"
                onClick={() => handleSoundToggle()}
              >
                {soundState ? (
                  <span
                    className="material-symbols-outlined"
                    aria-label="Toggle Background sound off"
                  >
                    <span aria-hidden="true">check_box</span>
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    aria-label="Toggle background sound on"
                  >
                    <span aria-hidden="true">check_box_outline_blank</span>
                  </span>
                )}
                <p aria-hidden="true">Toggle Sound</p>
              </div>
              <div
                className="options__animation"
                onClick={() => {
                  handleAnimationToggle();
                }}
                aria-hidden="true"
              >
                {animState ? (
                  <span className="material-symbols-outlined">
                    {" "}
                    <span aria-hidden="true">check_box</span>
                  </span>
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
                aria-label="Navigate to Credits Page"
              >
                <span
                  className="material-symbols-outlined options__credits--icon"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>
                <p className="options__credits--text" aria-hidden="true">
                  View Credits
                </p>
              </div>
              <div
                className="options__credits"
                onClick={() => navigate("/feedback")}
                aria-label="Navigate to Feedback Page"
              >
                <span
                  className="material-symbols-outlined options__credits--icon"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>
                <p className="options__credits--text" aria-hidden="True">
                  Submit Feedback
                </p>
              </div>
              <div
                className="options__credits"
                onClick={() => setTutorial(true)}
                aria-label="Toggle tutorial on"
              >
                <span
                  className="material-symbols-outlined options__credits--icon"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>
                <p className="options__credits--text" aria-hidden="true">
                  Open Help Panel
                </p>
              </div>
            </section>
          </div>
        </section>
      ) : (
        <div className="options__expand" onClick={() => setOptionExpand(true)} aria-label = "Expand Options Panel"> 
          <span className="material-symbols-outlined options__expand--icon" aria-hidden = "True">
            chevron_left
          </span>
          <span className="material-symbols-outlined options__expand--icon" aria-hidden = "true">
            settings
          </span>
          <p className="options__expand--header" aria-hidden = "true">Options</p>
        </div>
      )}
    </>
  );
};

export default Options;
