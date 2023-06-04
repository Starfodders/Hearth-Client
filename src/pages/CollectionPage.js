import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CollectionPage.scss";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import CollectionBlock from "../components/CollectionBlock/CollectionBlock";
import TechniqueIcon from "../assets/icons/techniqueIcon.svg";
import ListIcon from "../assets/icons/listIcon.svg";
import summaryIcon from "../assets/icons/summaryIcon.svg";
import textIcon from "../assets/icons/textIcon.svg";

const CollectionPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem("authToken")) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

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
          const response = await axios.get(
            `http://localhost:8080/collections/${userId}`
          );
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
          <CollectionBlock type={pageState} content={savedData} />
        </section>
      ) : (
        <section className="collections__content">
          <CollectionCard
            name="Summary Cards"
            image={summaryIcon}
            count={summaryCount}
            setBlock={setInsideBlock}
            setPage={setPageState}
          />
          <CollectionCard
            name="Technique Cards"
            image={TechniqueIcon}
            count={techniqueCount}
            setBlock={setInsideBlock}
            setPage={setPageState}
          />
          <CollectionCard
            name="List Cards"
            image={ListIcon}
            count={listCount}
            setBlock={setInsideBlock}
            setPage={setPageState}
          />
          <CollectionCard
            name="Text Cards"
            image={textIcon}
            count={textCount}
            setBlock={setInsideBlock}
            setPage={setPageState}
          />
        </section>
      )}
    </main>
  );
};

export default CollectionPage;
