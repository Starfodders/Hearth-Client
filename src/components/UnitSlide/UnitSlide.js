import "./UnitSlide.scss";
import { useEffect, useState } from "react";
import TextCard from "../SlideTypes/TextCard";
import TechniqueCard from "../SlideTypes/TechniqueCard";
import ListCard from "../SlideTypes/ListCard";
import SpecialCard from "../SlideTypes/SpecialCard";
// import FinishCard from "../SlideTypes/FinishCard";

const UnitSlide = ({ slide, unitID, currentSaved }) => {
  const { type } = slide;
  console.log(slide);

  const [isSaved, setIsSaved] = useState(false);

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
    return (
      <SpecialCard slide = {slide}/>
    );
  }
  if (type === "technique") {
    return (
      <TechniqueCard
        slide={slide}
        format={formatType}
        saveState={isSaved}
        saveFunc={setIsSaved}
        unitID={unitID}
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
      />
    );
  }
  // if (type === 'finish') {
  //   return (
  //     <FinishCard slide = {slide}/>
  //   )
  // }
  return (
    <TextCard
      slide={slide}
      format={formatType}
      saveState={isSaved}
      saveFunc={setIsSaved}
    />
  );
};

export default UnitSlide;
