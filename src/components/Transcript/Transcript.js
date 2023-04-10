import "./Transcript.scss";

const Transcript = ({ text }) => {
  console.log((text));
  if (!text) {
    return <p>Retrieving...</p>;
  }
  if (text) {
    const voiceoverObject = new Audio(`http://localhost:8080/${text.audio}`)
    voiceoverObject.play()
  }
  

  return (
    <div className="transcript__container">
      {Object.values(text.content).map((textBlock, index) => {
        return (
          <p key={index} className="transcript__paragraph">
            {textBlock}
          </p>
        );
      })}
    </div>
  );
};

export default Transcript;
