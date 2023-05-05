import "./MeditateComplete.scss";

const MeditateComplete = ({time}) => {


  function handleFinish() {
    window.location.reload()
  }

  return (
    <div className="med-complete__wrapper">
      <section className="med-complete__container">
        <p className="med-complete__heading">Meditation Complete!</p>
        <p className="med-complete__text"> Elapsed Time:</p>
        <p className="med-complete__text">{time} minutes</p>
        <button className="med-complete__btn" onClick = {() => handleFinish()}>Complete</button>
      </section>
    </div>
  );
};

export default MeditateComplete;
