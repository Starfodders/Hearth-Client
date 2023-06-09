import "./MeditateSetter.scss";
import MeditateActive from "../MeditateActive/MeditateActive";

const MeditateSetter = ({
  inputTime,
  setTime,
  start,
  active,
  setActive,
  startState,
  pause,
  currAudio,
  setAudio,
  currAudioObj,
}) => {
  //also validates so that max digits is 2
  function handleDuration(e) {
    const { value } = e.target;
    if (value.length <= 2) {
      setTime(value);
    }
  }

  //when 'START' is clicked, both Start and Active flags are true
  function handleStart() {
    startState();
  }

  //only toggles Active to false, START is overall still true until session is ended prematurely or concludes naturally
  function handlePause() {
    pause();
  }

  return (
    <div className={start ? "active__setting" : "meditate__setting"}>
      <main className="meditate__choices" aria-label="Set Meditation Settings">
        {/* Block determines Duration of Meditation */}
        {start ? null : (
          <div className="meditate__choices__block">
            <label
              className="meditate__choices__label"
              aria-label="Duration of Meditation"
            >
              <span aria-hidden="true">
              Duration{" "} </span>
              <span className="meditate__choices__label--small" aria-hidden = "true">(min)</span>
            </label>
            <input
              type="number"
              onChange={(e) => handleDuration(e)}
              value={inputTime}
              defaultValue="15"
              aria-label="Timer input"
              onKeyPress={(e) => {
                if (isNaN(Number(e.key)) || e.target.value.length >= 2) {
                  e.preventDefault();
                }
              }}
              className="meditate__choices__input"
            ></input>
          </div>
        )}
        {/* Block Determines Sound Chosen for Meditation */}
        {start ? null : (
          <div className="meditate__choices__block">
            <label
              className="meditate__choices__label--sound"
              aria-label="Choose a sound to accompany meditation"
            >
              <span aria-hidden="true">Sound</span>
            </label>
            <select
              className="meditate__choices__select"
              onChange={(e) => setAudio(e.target.value)}
              value={currAudio}
            >
              <option value="campfire">Campfire</option>
              <option value="rainforest">Rainforest</option>
              <option value="waves">Waves</option>
              {/* <option value="minecraft">Minecraft</option> */}
            </select>
          </div>
        )}
        {/* If Started, change to display the active panel */}
        {start ? (
          <MeditateActive
            currAudio={currAudio}
            currAudioObj={currAudioObj}
            active={active}
            resume={setActive}
            pause={handlePause}
          />
        ) : (
          <div className="meditate__choices__block">
            <button
              className="meditate__choices__button"
              onClick={() => handleStart()}
            >
              <span
                className="material-symbols-outlined inner-icon"
                aria-label="Start session"
              >
                <span aria-hidden="true">play_arrow</span>
              </span>
              <span aria-hidden = "true">Start</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MeditateSetter;
