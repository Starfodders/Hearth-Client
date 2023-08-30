import "./UnitSlide.scss";
import { useEffect, useState, useContext } from "react";
import TextCard from "../SlideTypes/TextCard";
import TechniqueCard from "../SlideTypes/TechniqueCard";
import ListCard from "../SlideTypes/ListCard";
import SpecialCard from "../SlideTypes/SpecialCard";
import SummaryCard from "../SlideTypes/SummaryCard";
import ProgressContext from "../ProgressContext/ProgressContext";

const UnitSlide = ({ slide, unitID, currentSaved, notifyChange }) => {
  const { type } = slide;
  const [isSaved, setIsSaved] = useState(false);
  const { darkMode } = useContext(ProgressContext);

  //capitalizes the 'Type' for display
  function formatType(string) {
    const changeFirst = string.charAt(0).toUpperCase();
    const restOfString = string.substring(1, string.length);
    return changeFirst.concat(restOfString);
  }

  //takes the array of saved data and updates each slide to render appropriate save state
  useEffect(() => {
    currentSaved.forEach((savedPage) => {
      if (savedPage.id === slide.id) {
        setIsSaved(true);
      }
    });
  }, [currentSaved]);

  if (type === "special") {
    return <SpecialCard slide={slide} darkMode = {darkMode} />;
  }
  if (type === "technique") {
    return (
      <TechniqueCard
        slide={slide}
        format={formatType}
        saveState={isSaved}
        saveFunc={setIsSaved}
        unitID={unitID}
        notifyChange={notifyChange}
        darkMode={darkMode}
      />
    );
  }
  if (type === "list") {
    return (
      <ListCard
        slide={slide}
        format={formatType}
        saveState={isSaved}
        saveFunc={setIsSaved}
        darkMode={darkMode}
      />
    );
  }
  if (type === "summary") {
    return (
      <SummaryCard
        slide={slide}
        format={formatType}
        saveState={isSaved}
        saveFunc={setIsSaved}
        darkMode={darkMode}
      />
    );
  }

  return (
    <TextCard
      slide={slide}
      format={formatType}
      saveState={isSaved}
      saveFunc={setIsSaved}
      darkMode={darkMode}
    />
  );
};

export default UnitSlide;
