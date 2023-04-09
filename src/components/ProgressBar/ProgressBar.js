import { useEffect, useState } from "react";
import "./ProgressBar.scss"

const ProgressBar = ({ details, level, progress }) => {
  const { current, unit, completedChapters, completedSections } = progress;

  const [currentContent, setCurrentContent] = useState(0);

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
      return <div className="progress__box"><p className="progress__notif">Complete</p></div>;
    } else if (details.id === unit) {
      return <div className="progress__box"><p className="progress__notif">In Progress</p></div>;
    }
  }

  return (
    <div className="progress__container">
      <label htmlFor="progress" className="progress__label">{`${currentContent}/${details.units}`}</label>
      <progress
        value={currentContent}
        max={details.units}
        name="progress"
        className="progress__bar"
      ></progress>
    </div>
  );
};

export default ProgressBar;
