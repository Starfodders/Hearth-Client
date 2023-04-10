import React, { useState, useEffect } from "react";
import axios from "axios";
import Transcript from "../Transcript/Transcript";

const CollectionExpandTech = ({ content }) => {
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
            `http://localhost:8080/units/transcript/${unit_id}/${page_number}`
          )
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
      <div className="slide__container__bottom">
        <div className="slide__container__bottom__block--small">
          {transcriptState ? (
            <span
              className="material-symbols-outlined slide__start--less--small"
              onClick={() => toggleTranscript()}
            >
              unfold_less
            </span>
          ) : (
            <span
              className="material-symbols-outlined slide__start--more-small"
              onClick={() => toggleTranscript()}
            >
              unfold_more
            </span>
          )}
          <p className="slide__play--toggle--small" onClick={() => toggleTranscript()}>
            {transcriptState ? "View Less" : "View More"}
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
        <Transcript text={transcriptData} state={transcriptState} />
      ) : null}
    </>
  );
};

export default CollectionExpandTech;
