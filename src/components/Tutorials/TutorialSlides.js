import "./Tutorials.scss";
import TutorialSlide from "./TutorialSlide";
import arrow from "../../assets/icons/tutorialArrow.svg";
import { useState } from "react";

const TutorialSlides = ({ toggle }) => {
  const Modal1 = () => {
    return (
      <>
        <TutorialSlide
          type="navigate"
          content="Scroll through the unit slides using the arrows."
        />
        <img src={arrow} alt="" className="tutorial__arrow--navigate-left" />
        <img src={arrow} alt="" className="tutorial__arrow--navigate-right" />
      </>
    );
  };
  const Modal2 = () => {
    return (
      <>
        <TutorialSlide
          type="save"
          content="Save content by clicking on this icon. Saved content will appear in the Collections tab."
        />
        <img src={arrow} alt="" className="tutorial__arrow--save" />
      </>
    );
  };

  const modals = [Modal1, Modal2];
  const [currentModal, setCurrentModal] = useState(0);
  const ModalComponent = modals[currentModal];

  const nextModal = () => {
    if (currentModal !== modals.length - 1) {
      setCurrentModal((prev) => prev + 1);
    } else {
      toggle(false);
      localStorage.setItem("slide-tutorial", true);
    }
  };

  return (
    <div className="tutorial__wrapper" onClick={() => nextModal()}>
      <ModalComponent />
    </div>
  );
};

export default TutorialSlides;
