import "./Tutorials.scss";
import TutorialSlide from "./TutorialSlide";
import arrow from "../../assets/icons/tutorialArrow.svg";
import { useState } from "react";

const TutorialChapters = ({toggle}) => {
  const Modal1 = () => {
    return (
      <TutorialSlide
        type="welcome"
        content="The content of Hearth is broken down into specific chapters, sections, and units. The lessons are intended to build on one another and as such, must be unlocked in by completing the previous unit."
      />
    );
  };

  const modals = [Modal1];
  const [currentModal, setCurrentModal] = useState(0);
  const ModalComponent = modals[currentModal];

  const nextModal = () => {
    if (currentModal !== modals.length - 1) {
      setCurrentModal((prev) => prev + 1);
    }
    else {
        toggle(false);
        localStorage.setItem('chapters-tutorial', true);
    }
  };

  return (
    <div className="tutorial__wrapper" onClick={() => nextModal()}>
      <ModalComponent />
    </div>
  );
};

export default TutorialChapters;

