import { useEffect, useState } from "react";

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
      return <div>Complete</div>;
    } else if (details.id === unit) {
      return <div>In Progress</div>;
    }
  }

  return <div>{`${currentContent}/${details.units}`}</div>;
};

export default ProgressBar;
