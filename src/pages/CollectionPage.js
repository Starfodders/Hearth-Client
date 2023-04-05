import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CollectionPage.scss";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const CollectionPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!savedData) {
      const getData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/collections/${userId}`
          );
          setSavedData(response.data);
          if (response) {
            setIsLoaded(true);
            console.log(response.data);
          }
        } catch (error) {
          console.log(error + " Error retrieving collection data");
        }
      };
      getData();
    }
  }, []);

  if (!isLoaded) {
    return (
      <main className="collections__wrapper">
        <Loader />
      </main>
    );
  }

  return (
    <main className="collections__wrapper">
      <div className="collections__title">
        <span
          className="material-symbols-outlined collections__return"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h1 className="collections__title--text">Collections</h1>
      </div>
      <section className="collections__content">
        <CollectionCard name="Summary Cards" />
        <CollectionCard name="Technique Cards" />
        <CollectionCard name="List Cards" />
        <CollectionCard name="Text Cards" />
      </section>
    </main>
  );
};

export default CollectionPage;
