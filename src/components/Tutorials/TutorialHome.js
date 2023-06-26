import "./Tutorials.scss";
import TutorialSlide from "./TutorialSlide";
import arrow from "../../assets/icons/tutorialArrow.svg";
import { useState } from "react";

const TutorialHome = ({toggle}) => {
  const Modal1 = () => {
    return (
      <TutorialSlide
        type="welcome"
        content="Welcome to Hearth! This tutorial will explain a few things. Click anywhere to continue."
      />
    );
  };

  const Modal2 = () => {
    return (
      <>
        <TutorialSlide
          type="botnav"
          content="This is your navigation panel, you can access the content of Hearth by clicking on any of these icons."
        />
        <img src={arrow} alt="" className="tutorial__arrow--botnav" />
      </>
    );
  };
  const Modal3 = () => {
    return (
      <>
        <TutorialSlide
          type="tophome"
          content="Clicking on the Hearth title will return you to the home page at any time."
        />
        <img src={arrow} alt="" className="tutorial__arrow--tophome" />
      </>
    );
  };
  const Modal4 = () => {
    return (
      <>
        <TutorialSlide
          type="options"
          content="Here you can toggle effects and review side-content, submit feedback"
        />
        <img src={arrow} alt="" className="tutorial__arrow--options" />
      </>
    );
  };

  const modals = [Modal1, Modal2, Modal3, Modal4];
  const [currentModal, setCurrentModal] = useState(0);
  const ModalComponent = modals[currentModal];

  const nextModal = () => {
    if (currentModal !== modals.length - 1) {
      setCurrentModal((prev) => prev + 1);
    }
    else {
        toggle(false)
        localStorage.setItem('home-tutorial', true)
    }
  };

  return (
    <div className="tutorial__wrapper" onClick={() => nextModal()}>
      <ModalComponent />
    </div>
  );
};

export default TutorialHome;

