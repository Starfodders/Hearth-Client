import "./Options.scss";
import {useNavigate} from "react-router-dom";


const Options = ({ animToggle, animState, soundToggle, soundState }) => {
  const navigate = useNavigate();

  function handleAnimationToggle() {
    animToggle();
  }

  function handleSoundToggle() {
    soundToggle();
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
      <div className="options__credits" onClick = {() => navigate('/credits')}>
        <span className="material-symbols-outlined options__credits--icon">arrow_right_alt</span>
        <p className="options__credits--text">Credits & Contributions</p>
      </div>
    </div>
  );
};

export default Options;
