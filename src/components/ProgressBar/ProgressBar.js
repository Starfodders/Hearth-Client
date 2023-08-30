import { useEffect, useState, useContext } from "react";
import "./ProgressBar.scss"
import ProgressContext from "../ProgressContext/ProgressContext";

const ProgressBar = ({ details, level, progress }) => {
  const { current, unit, completedChapters, completedSections } = progress;

  const [currentContent, setCurrentContent] = useState(0);
  const { darkMode } = useContext(ProgressContext);


  useEffect(() => {
    if (level === "chapters") {
      completedChapters.forEach((chapter) => {
        if (chapter.chapter_id === details.id) {
          setCurrentContent(chapter.units_complete);
        }
      });
    }
    if (level === "sections") {
      completedSections.forEach((section) => {
        if (section.section_id === details.id) {
          setCurrentContent(section.units_complete);
        }
      });
    }
  }, [details, currentContent]);

  if (level === "units") {
    if (details.id <= current) {
      return <div className="progress__box" aria-label ="Unit is Complete"><p className={darkMode ? "progress__notif--dark" : "progress__notif"} aria-hidden="true">Complete</p></div>;
    } else if (details.id === unit) {
      return <div className="progress__box" aria-label="Unit is Currently in Progress"><p className={darkMode ? "progress__notif--progress--dark":"progress__notif--progress"}  aria-hidden="true">In Progress</p></div>;
    }
  }

  return (
    <div className="progress__container" aria-label={`${currentContent} out of ${details.units} complete`}>
      <label htmlFor="progress" className="progress__label" aria-hidden="true">{`${currentContent}/${details.units}`}</label>
      <progress
        value={currentContent}
        max={details.units}
        name="progress"
        className="progress__bar"
        aria-hidden="true"
      ></progress>
    </div>
  );
};

export default ProgressBar;
