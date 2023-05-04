import "../MeditateComplete/MeditateComplete.scss";

const EndMeditate = ({endSession}) => {
  return (
    <div className="med-complete__wrapper">
      <section className="med-complete__container">
        <p className="med-complete__heading">
          Are you sure you want to end this session?
        </p>
        <div className="med-complete__block">
          <button className="med-complete__btn--end" onClick = {() => window.location.reload()}>Yes</button>
          <button className="med-complete__btn--end" onClick = {() => endSession(false)}>No</button>
        </div>
      </section>
    </div>
  );
};

export default EndMeditate;
