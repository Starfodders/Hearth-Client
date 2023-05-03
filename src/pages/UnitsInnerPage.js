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

const UnitsPage = ({isLoggedIn}) => {

  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem('authToken')) {
        navigate('/')
      }
    } 
}, [isLoggedIn])

  const params = useParams();
  const { id, name } = params;

  const carouselElRef = useRef(null);
  const backElRef = useRef(null);
  const forwardElRef = useRef(null);

  const [isCloser, setIsCloser] = useState(false)

  function handleForward() {
    carouselElRef.current.swiper.slideNext();
    if(currentPage === totalPages) {
      setIsCloser(true)
    }
  }
  function handleBack() {
    carouselElRef.current.swiper.slidePrev();
  }

  const [unitData, setUnitData] = useState([]);
  const [unitSavedData, setUnitSavedData] = useState([])
  const [finishData, setFinishData] = useState([])
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageTitle, setPageTitle] = useState("Title");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [unitResponse, savedResponse, finishData] = await Promise.all([
          axios.get(`http://localhost:8080/units/${id}`),
          axios.get(`http://localhost:8080/collections/${sessionStorage.getItem('userId')}`),
          axios.get(`http://localhost:8080/units/finish/${id}`)
        ]);
        setUnitData(unitResponse.data);
        setUnitSavedData(savedResponse.data);
        setFinishData(finishData.data)
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
        <img src={topwave} className="units__bg--img" alt="moving waves" />
      </div>
      {isCloser ? <FinishCard details = {finishData}/> : null}
      <main className="units__container">
        <div className="units__header">
          <span
            className="material-symbols-outlined units__return"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
          <h2 className="units__title">{pageTitle}</h2>
          <span className="units__pages">
            {currentPage}/{totalPages}
          </span>
        </div>
        <swiper-container
          slides-per-view="1"
          className="carousel__main"
          ref={carouselElRef}
          onTransitionEnd={() => handleTransition()}
        >
          {unitData.map((slide, index) => {
            return (
              <swiper-slide key={index}>
                <UnitSlide slide={slide} unitID = {id} currentSaved = {unitSavedData} notifyChange = {currentPage}/>
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
