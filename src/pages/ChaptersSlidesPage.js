import "../styles/ChaptersPage.scss";
import ChaptersBlock from "../components/ChaptersBlock/ChaptersBlock";
import Loader from "../components/Loader/Loader";

import axios from "axios";
import { useState, useEffect } from "react";
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
          axios.get(`./netlify/functions/chapters/${currentUser}`),
          axios.get(`./netlify/functions/user/progress/${currentUser}`),
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
        <ChaptersBlock
          content={initialContent}
          progress={userProgress}
          title="Chapters"
          level="chapters"
          destination="/home"
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ChaptersSlidesPage;
