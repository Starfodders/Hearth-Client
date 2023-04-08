import "./Transcript.scss";

const Transcript = ({ text }) => {
  if (!text) {
    return <p>Retrieving...</p>;
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
