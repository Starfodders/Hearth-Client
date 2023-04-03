import "../styles/UnitsPage.scss";
import topwave from "../assets/images/top-wave.svg";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import UnitSlide from "../components/UnitSlide/UnitSlide";
import savedOff from "../assets/icons/savedEmpty.svg"
import savedOn from "../assets/icons/savedFull.svg"


//Swiper Components
import { register } from "swiper/element/bundle";
register();

const UnitsPage = () => {
  const params = useParams();
  const { id } = params;

  const carouselElRef = useRef(null);
  const backElRef = useRef(null);
  const forwardElRef = useRef(null);

  function handleForward() {
    carouselElRef.current.swiper.slideNext();
  }

  function handleBack() {
    carouselElRef.current.swiper.slidePrev();
  }

  const [unitData, setUnitData] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const getUnitData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/units/${id}`);
        setUnitData(response.data);
        if (unitData) {
          console.log(unitData);
          setPageLoaded(true);
        }
      } catch (err) {
        console.log(err + "Error retrieving unit data");
      }
    };
    getUnitData();
  }, [params]);

  if (!pageLoaded) {
    return (
      <div className="wrapper">
        <div className="units__bg">
          <img src={topwave} className="units__bg--img" alt="moving waves" />
        </div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="units__bg">
        <img src={topwave} className="units__bg--img" alt="moving waves" />
      </div>
      <main className="units__container">
        <div className="units__header">
          <span className="material-symbols-outlined units__return">
            arrow_back
          </span>
          <h2 className="units__title">Title</h2>
          <span className="units__pages">1/x</span>
          <span><img src = {savedOff} className= "units__saved"/></span>
        </div>
        <swiper-container
          slides-per-view="1"
          pagination="true"
          className="carousel__main"
          ref={carouselElRef}
        >
          {unitData.map((slide, index) => {
            return (
              <swiper-slide key = {index}>
                <UnitSlide slide={slide} />
              </swiper-slide>
            );
          })}
        </swiper-container>
        <div className="carousel__buttons">
          <span
            className="material-symbols-outlined carousel__buttons--el"
            ref={backElRef}
            onClick={() => handleBack()}
          >
            arrow_back
          </span>
          <span
            className="material-symbols-outlined carousel__buttons--el"
            ref={forwardElRef}
            onClick={() => handleForward()}
          >
            arrow_forward
          </span>
        </div>
      </main>
    </div>
  );
};

export default UnitsPage;
