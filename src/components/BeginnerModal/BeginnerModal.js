import axios from "axios";
import "./BeginnerModal.scss";
import { useState } from "react";
import example1 from "../../assets/tutorial/example1.gif";
import example2 from "../../assets/tutorial/example2.png";
import example3 from "../../assets/tutorial/example3.gif";
import example4 from "../../assets/tutorial/example4.gif";
import example5 from "../../assets/tutorial/example5.gif";
import example6 from "../../assets/tutorial/example6.gif";
import example7 from "../../assets/tutorial/example7.png";
import example8 from "../../assets/tutorial/example8.gif";
import example9 from "../../assets/tutorial/example9.gif";
import listExample from "../../assets/tutorial/listexample.gif"

const BeginnerModal = ({ change }) => {
  function handleConfirm() {
    axios.patch(
      `http://localhost:8080/users/patchNew/${sessionStorage.getItem("userId")}`
    );
    change(false);
  }

  const Slide1 = () => {
    return (
      <>
        <h2 className="modal__title">
          This is the <span style={{ color: "#52B69A" }}>Hearth</span>
        </h2>
        <p className="modal__para">
          A place for you to begin your lessons each time you visit. It will
          also act as a meeting ground for your digital companions as you
          complete each major chapter.
        </p>
      </>
    );
  };

  const Slide2 = () => {
    return (
      <>
        <p className="modal__para">
          At the bottom of your screen is your navigation bar. There you will
          find three choices and will serve as your primary way of accessing
          content throughout the app.
        </p>
        <img src={example1} alt="" className="modal__img" />
      </>
    );
  };
  const Slide3 = () => {
    return (
      <>
        <p className="modal__para">
          Clicking on the Hearth logo at the top of your screen will return you back to this landing page.
        </p>
        <img src={example6} alt="" className="modal__img" />
      </>
    );
  };

  const Slide4 = () => {
    return (
      <>
        <p className="modal__para">
          The content is divided into individual chapters, sections, and units.
          Each concept will build on the last and is unlocked in sequential
          order.
        </p>
        <img src={example2} alt="" className="modal__img" />
      </>
    );
  };

  const Slide5 = () => {
    return (
      <>
        <p className="modal__para">
          To navigate each unit's contents, use the arrow icons on either side
          of the slide. If you're on a mobile device, the arrows are on the
          bottom of the screen.
        </p>
        <div className="modal__img--container">
          <img src={example3} alt="" className="modal__img--half" />
          <img src={example4} alt="" className="modal__img--half" />
        </div>
      </>
    );
  };
  const Slide6 = () => {
    return (
      <>
        <p className="modal__para">
          Content can be saved easily for later reference by clicking on this
          icon available on each slide.
        </p>
        <div className="modal__img--container">
          <img src={example5} alt="" className="modal__img--half" />
        </div>
      </>
    );
  };
  const Slide7 = () => {
    return (
      <>
        <p className="modal__para">
          When this icon is highlighted, external resources are available. These
          PDFs will supplement the current slide's lessons and can be printed or
          downloaded.
        </p>
        <img src={example7} alt="" className="modal__img--half" />
      </>
    );
  };
  const Slide8 = () => {
    return (
      <>
        <p className="modal__para">
          On list cards, clicking or interacting with the associated mascot will prompt them to produce a suggestion! 
        </p>
        <img src={listExample} alt="" className="modal__img" />
      </>
    );
  };
  const Slide9 = () => {
    return (
      <>
        <p className="modal__para">
          You can embark on a soothing meditation session at any time in the
          Meditations tab, tailoring the duration and selecting a background
          ambiance to enhance your session.
        </p>
        <img src={example8} alt="" className="modal__img" />
      </>
    );
  };
  const Slide10 = () => {
    return (
      <>
        <p className="modal__para">
          Content that you've saved during your time spent in Hearth can be
          accessed in the Collections tab.
        </p>
        <img src={example9} alt="" className="modal__img" />
      </>
    );
  };
  const Slide11 = () => {
    return (
      <>
        <p className="modal__para">
          If you encounter any bugs or problems, or have any recommendations,
          feel free to send feedback in the tab on your right.
        </p>
      </>
    );
  };

  const slides = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide9,
    Slide10,
    Slide11
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  function handleNextSlide() {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  }

  function handlePrevSlide() {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  }

  const SlideComponent = slides[currentSlide];

  return (
    <div className="modal__wrapper">
      <div className="modal__container">
        <SlideComponent />
        <div className="modal__bottom">
          <div className="modal__navigation">
            {currentSlide > 0 && currentSlide !== slides.length - 1 && (
              <button className="modal__btn" onClick={handlePrevSlide}>
                Previous
              </button>
            )}
            {currentSlide < slides.length - 1 && (
              <button className="modal__btn" onClick={handleNextSlide}>
                Next
              </button>
            )}
            {currentSlide === slides.length - 1 && (
              <button onClick={() => handleConfirm()} className="modal__btn">
                Confirm
              </button>
            )}
          </div>
          <div className="modal__skip">
            <p className="modal__skip--text" onClick={() => handleConfirm()}>
              Skip tutorial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeginnerModal;
