import { useState, useEffect } from "react";
import axios from "axios";
import Transcript from "../Transcript/Transcript";

const CollectionExpandTech = ({ content, darkMode }) => {
  const { transcript, audio, unit_id, page_number } = content;

  const [transcriptState, setTranscriptState] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);
  const [transcriptLoaded, setTranscriptLoaded] = useState(false);

  function toggleTranscript() {
    setTranscriptState((prevState) => !prevState);
    if (transcriptState) {
      setTranscriptLoaded(true);
    } else {
      setTranscriptLoaded(false);
      setTranscriptData(null);
    }
  }

  useEffect(() => {
    if (transcript && transcriptState) {
      if (!transcriptData) {
        axios
          .get(
            `/.netlify/functions/units/transcript?unitID=${unit_id}&pageNum=${page_number}`
          )
        // axios.get(`http://localhost:8080/units/transcript/${unit_id}/${page_number}`)
          .then((response) => {
            setTranscriptData(response.data);
            setTranscriptLoaded(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [transcriptState, transcriptData]);

  return (
    <>
      <div className={darkMode ? "slide__container__bottom--dark":"slide__container__bottom"}>
        <div className="slide__container__bottom__block--small">
          {transcriptState ? (
            <span
              className="material-symbols-outlined slide__start--less--small"
              onClick={() => toggleTranscript()}
              aria-label = "Interact to close technique transcript"
              >
              <span aria-hidden="true">unfold_less</span>
            </span>
          ) : (
            <span
              className="material-symbols-outlined slide__start--more-small"
              onClick={() => toggleTranscript()}
              >
              <span aria-hidden="true">unfold_more</span>
            </span>
          )}
          <p className="slide__play--toggle--small" onClick={() => toggleTranscript()}>
            {transcriptState ? <span aria-hidden = "true">View Less</span> : <span aria-hidden = "true">View More</span>}
          </p>
        </div>
        <div className="slide__container__bottom__block--small">
          {audio ? (
            <p className="slide__play--small">Audio Available</p>
          ) : (
            <p className="slide__play--small">No Audio Available</p>
          )}
        </div>
      </div>
      {transcriptLoaded && transcriptState ? (
        <Transcript text={transcriptData} darkMode={darkMode}/>
      ) : null}
    </>
  );
};

export default CollectionExpandTech;
