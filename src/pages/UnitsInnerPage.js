import "../styles/UnitsPage.scss";
import topwave from "../assets/images/top-wave.svg";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import UnitSlide from "../components/UnitSlide/UnitSlide";
import FinishCard from "../components/SlideTypes/FinishCard";

//Swiper Components
import { register } from "swiper/element/bundle";
register();

const UnitsPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem("authToken")) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  const params = useParams();
  const { id, name } = params;

  const carouselElRef = useRef(null);
  const backElRef = useRef(null);
  const forwardElRef = useRef(null);

  const [isCloser, setIsCloser] = useState(false);

  function handleForward() {
    carouselElRef.current.swiper.slideNext();
    if (currentPage === totalPages) {
      setIsCloser(true);
    }
  }
  function handleBack() {
    carouselElRef.current.swiper.slidePrev();
  }

  const [unitData, setUnitData] = useState([]);
  const [unitSavedData, setUnitSavedData] = useState([]);
  const [finishData, setFinishData] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageTitle, setPageTitle] = useState("Title");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [unitResponse, savedResponse, finishData] = await Promise.all([
          axios.get(`http://localhost:8080/units/${id}`),
          axios.get(`http://localhost:8080/collections/${id}`),
          axios.get(`http://localhost:8080/units/finish/${id}`),
          // axios.get(`/.netlify/functions/units/single?unitID=${id}`),
          // axios.get(
          //   `/.netlify/functions/collection?userID=${sessionStorage.getItem(
          //     "userId"
          //   )}`
          // ),
          // axios.get(`/.netlify/functions/units/closer?unitID=${id}`)
        ]);
        setUnitData(unitResponse.data);
        setUnitSavedData(savedResponse.data);
        setFinishData(finishData.data);
      } catch (err) {
        console.log(err + " Error retrieving unit data");
      }
    };
    getData();
  }, [params]);

  useEffect(() => {
    if (unitData.length > 0) {
      setTotalPages(unitData.length);
      setPageLoaded(true);
      setPageTitle(name);
      // console.log(unitData);
      // console.log(unitSavedData);
    }
  }, [unitData]);

  function handleTransition() {
    //when fired, updates currentPage to the current active index
    const activeIndex = carouselElRef.current.swiper.realIndex + 1;
    setCurrentPage(activeIndex);
  }

  if (!pageLoaded) {
    return (
      <div className="wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="units__bg">
        <img src={topwave} className="units__bg--img" alt="" />
      </div>
      {isCloser ? <FinishCard details={finishData} /> : null}
      <main className="units__container" aria-label="Unit Slides">
        <div
          className="units__header"
          aria-hidden={isCloser ? "true" : "false"}
        >
          <span
            className="material-symbols-outlined units__return"
            onClick={() => navigate(-1)}
            aria-label="Return to Unit Selection"
            aria-hidden={isCloser ? "true" : "false"}
          >
            <span aria-hidden="true">arrow_back</span>
          </span>
          <h2 className="units__title" aria-hidden="true">
            {pageTitle}
          </h2>
          <span
            className="units__pages"
            aria-label={`Page ${currentPage} of ${totalPages}`}
            aria-hidden={isCloser ? "true" : "false"}
          >
            <span aria-hidden="true">
              {currentPage}/{totalPages}
            </span>
          </span>
        </div>
        {/* navigation buttons put higher up for screen reader */}
        <div className="carousel__buttons">
          <span
            className="material-symbols-outlined carousel__buttons--el"
            ref={backElRef}
            onClick={() => handleBack()}
            aria-label="Go back 1 slide"
            aria-hidden={isCloser ? "true" : "false"}
          >
            <span aria-hidden="true">arrow_back</span>
          </span>
          <span
            className="material-symbols-outlined carousel__buttons--el"
            ref={forwardElRef}
            onClick={() => handleForward()}
            aria-label="Go forward 1 slide"
            aria-hidden={isCloser ? "true" : "false"}
          >
            <span aria-hidden="true">arrow_forward</span>
          </span>
        </div>
        <swiper-container
          slides-per-view="1"
          className="carousel__main"
          ref={carouselElRef}
          onTransitionEnd={() => handleTransition()}
          aria-hidden={isCloser ? "true" : "false"}
          // auto-height = "true"
        >
          {unitData.map((slide, index) => {
            const isActiveSlide = index === currentPage - 1;
            return (
              <swiper-slide
                key={index}
                aria-hidden={!isActiveSlide || isCloser}
              >
                <UnitSlide
                  slide={slide}
                  unitID={id}
                  currentSaved={unitSavedData}
                  notifyChange={currentPage}
                />
              </swiper-slide>
            );
          })}
        </swiper-container>
      </main>
    </div>
  );
};

export default UnitsPage;
