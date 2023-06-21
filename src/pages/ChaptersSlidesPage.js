import "../styles/ChaptersPage.scss";
import ChaptersBlock from "../components/ChaptersBlock/ChaptersBlock";
import GoNextContent from "../components/GoNextContent/GoNextContent";
import Loader from "../components/Loader/Loader";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChaptersSlidesPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem("authToken")) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [initialContent, setInitialContent] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const currentUser = sessionStorage.getItem("userId");

  //handles initial content which is overall chapters
  useEffect(() => {
    const getChapters = async () => {
      try {
        const [chapterData, currentProgress] = await Promise.all([
          // axios.get(`http://localhost:8080/chapters/${currentUser}`),
          // axios.get(`http://localhost:8080/users/progress/${currentUser}`),
          axios.get(`/.netlify/functions/chapters?userID=${currentUser}`),
          axios.get(`/.netlify/functions/user/progress?userID=${currentUser}`),
        ]);
        setInitialContent(chapterData.data);
        setUserProgress(currentProgress.data.userProgress);
        setIsLoaded(true);
      } catch (error) {
        console.log(error + "Error retrieving chapter data");
      }
    };
    getChapters();
  }, []);

  return (
    <div>
      {isLoaded ? (
        <>
        <ChaptersBlock
          content={initialContent}
          progress={userProgress}
          title="Chapters"
          level="chapters"
          destination="/home"
        />
        <GoNextContent/>
        </>
      ) : (
        <div className="loader__container">
        <Loader />
        </div>
      )}
    </div>
  );
};

export default ChaptersSlidesPage;
