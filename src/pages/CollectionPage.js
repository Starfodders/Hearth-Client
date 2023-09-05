import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CollectionPage.scss";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import CollectionBlock from "../components/CollectionBlock/CollectionBlock";
import techniqueIcon from "../assets/icons/techniqueIcon.svg";
import techniqueIconDark from "../assets/icons/techniqueIconDark.svg";
import listIcon from "../assets/icons/listIcon.svg";
import listIconDark from "../assets/icons/listIconDark.svg";
import summaryIcon from "../assets/icons/summaryIcon.svg";
import summaryIconDark from "../assets/icons/summaryIconDark.svg";
import textIcon from "../assets/icons/textIcon.svg";
import textIconDark from "../assets/icons/textIconDark.svg";
import ProgressContext from "../components/ProgressContext/ProgressContext";

const CollectionPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem("authToken")) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  const { darkMode } = useContext(ProgressContext);

  const [savedData, setSavedData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const [pageState, setPageState] = useState("");
  const [insideBlock, setInsideBlock] = useState(false);

  const [summaryCount, setSummaryCount] = useState(0);
  const [techniqueCount, setTechniqueCount] = useState(0);
  const [listCount, setListCount] = useState(0);
  const [textCount, setTextCount] = useState(0);

  //get array of saved posts
  useEffect(() => {
    if (!savedData || !insideBlock) {
      const getData = async () => {
        try {
          // const response = await axios.get(`http://localhost:8080/collections/${userId}`)
          const response = await axios.get(`/.netlify/functions/collection?userID=${userId}`);
          setSavedData(response.data);
          if (response) {
            setIsLoaded(true);
          }
        } catch (error) {
          console.log(error + " Error retrieving collection data");
        }
      };
      getData();
    }
  }, [insideBlock]);

  //counts the amount of specific TYPEs and sets their counters
  useEffect(() => {
    const typeVariables = {
      text: setTextCount,
      summary: setSummaryCount,
      technique: setTechniqueCount,
      list: setListCount,
    };

    if (savedData) {
      savedData.forEach((page) => {
        const { type } = page;
        if (typeVariables[type]) {
          typeVariables[type]((prev) => prev + 1);
        }
      });
    }
    return () => {
      setSummaryCount(0);
      setTextCount(0);
      setTechniqueCount(0);
      setListCount(0);
    };
  }, [savedData]);

  if (!isLoaded) {
    return (
      <main className="collections__wrapper">
        <Loader />
      </main>
    );
  }

  return (
    <main className="collections__wrapper" aria-label={insideBlock ? pageState :"Choice of Saved Content"}>
      <Helmet>
        <meta name = "description" content = "Reference your saved content, divided into text, list, techniques, and summary cards"/>
        <meta name = "keywords" content = "Text, Technique, List, Summary, Saved"/>
      </Helmet>
      <div className="collections__title">
        {insideBlock ? (
          <span
            className="material-symbols-outlined collections__return"
            onClick={() => setInsideBlock(false)}
            aria-label="Return to Saved Categories"
          >
            <span aria-hidden="true">arrow_back</span>
          </span>
        ) : (
          <span
            className="material-symbols-outlined collections__return"
            onClick={() => navigate("/home")}
            aria-label="Return to Homepage"
          >
            <span aria-hidden="true">arrow_back</span>
          </span>
        )}
        <h1 className="collections__title--text" aria-hidden = {insideBlock ? true : false}>Collections</h1>
      </div>
      {insideBlock ? (
        <section className="collections__content--list">
          <CollectionBlock type={pageState} content={savedData} darkMode = {darkMode} />
        </section>
      ) : (
        <section className="collections__content">
          <CollectionCard
            name="Summary Cards"
            image={darkMode ? summaryIconDark:summaryIcon}
            count={summaryCount}
            setBlock={setInsideBlock}
            setPage={setPageState}
            darkMode = {darkMode}
          />
          <CollectionCard
            name="Technique Cards"
            image={darkMode ? techniqueIconDark:techniqueIcon}
            count={techniqueCount}
            setBlock={setInsideBlock}
            setPage={setPageState}
            darkMode = {darkMode}
          />
          <CollectionCard
            name="List Cards"
            image={darkMode ? listIconDark:listIcon}
            count={listCount}
            setBlock={setInsideBlock}
            setPage={setPageState}
            darkMode = {darkMode}
          />
          <CollectionCard
            name="Text Cards"
            image={darkMode ? textIconDark:textIcon}
            count={textCount}
            setBlock={setInsideBlock}
            setPage={setPageState}
            darkMode = {darkMode}
          />
        </section>
      )}
    </main>
  );
};

export default CollectionPage;
