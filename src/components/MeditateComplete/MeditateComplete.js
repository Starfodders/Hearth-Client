import "./MeditateComplete.scss";

const MeditateComplete = ({opened, time}) => {
  return (
    <div className="med-complete__wrapper">
      <section className="med-complete__container">
        <p className="med-complete__heading">Meditation Complete!</p>
        <p className="med-complete__text"> Elapsed Time:</p>
        <p className="med-complete__text">{time} minutes</p>
        <button className="med-complete__btn" onClick = {() => opened(false)}>Complete</button>
      </section>
    </div>
  );
};

export default MeditateComplete;
