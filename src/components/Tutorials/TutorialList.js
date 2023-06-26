import "./Tutorials.scss";
import TutorialSlide from "./TutorialSlide";
import arrow from "../../assets/icons/tutorialArrow.svg";
import { useState } from "react";

const TutorialList = ({ toggle }) => {
  const Modal1 = () => {
    return (
      <>
        <TutorialSlide
          type="welcome"
          content="You've likely seen this icon throughout your journey. When it is highlighted, it means an external resource is available. Clicking on it will open the file in a new tab."
        />
        <img src={arrow} alt="" className="tutorial__arrow--resource" />
      </>
    );
  };
  const Modal2 = () => {
    return (
      <>
        <TutorialSlide
          type="welcome"
          content="This is also the first instance of a List Type slide. Whenever these appear, the chapter's mascot (in this case, TAL) will be at the bottom. Interact (click) on him to generate a prompt relevant to the current slide!"
        />
        <img src={arrow} alt="" className="tutorial__arrow--botnav" />
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
      localStorage.setItem('list-tutorial', true)
    }
  };

  return (
    <div className="tutorial__wrapper" onClick={() => nextModal()}>
      <ModalComponent />
    </div>
  );
};

export default TutorialList;
