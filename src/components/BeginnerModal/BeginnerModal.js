import axios from "axios";
import "./BeginnerModal.scss";

const BeginnerModal = ({change}) => {

    function handleConfirm() {
        axios.patch(`http://localhost:8080/users/patchNew/${sessionStorage.getItem('userId')}`)
        change(false)
    }

  return (
    <div className="modal__wrapper">
      <div className="modal__container">
        <h1 className="modal__title">
          This is the <span>Hearth</span>
        </h1>
        <p className="modal__para">
          A place for you to begin your lessons each time you visit. It will
          also act as a meeting ground for your digital companions, but more
          information will become available to you shortly.
        </p>
        <p className="modal__para">
          At the bottom of your screen is your navigation bar. There you will
          find three choices and will serve as your primary way of accessing
          content throughout the app. Information on them will be made available
          to you as you progress.
        </p>
        <p className="modal__para">
          The content of Hearth is divided into chapters, then sections, and
          finally into individual units. You will need to finish each unit to
          progress onto the next. The lessons you learn in each are intended to
          build upon one another.
        </p>
        <button className="modal__btn" onClick = {() => handleConfirm()}>Confirm</button>
      </div>
    </div>
  );
};

export default BeginnerModal;
