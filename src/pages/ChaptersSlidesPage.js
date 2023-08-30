import "../styles/ChaptersPage.scss";
import ChaptersBlock from "../components/ChaptersBlock/ChaptersBlock";
import GoNextContent from "../components/GoNextContent/GoNextContent";

import Loader from "../components/Loader/Loader";

import axios from "axios";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import TutorialChapters from "../components/Tutorials/TutorialChapters";
import UnitSkeleton from "../components/UnitSkeleton/UnitSkeleton";

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
  const [chaptersTutorial, setChaptersTutorial] = useState(false);
  const currentUser = sessionStorage.getItem("userId");

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imagesArray, setImagesArray] = useState({});

  //handles initial content which is overall chapters
  useEffect(() => {
    const getChapters = async () => {
      try {
        const [chapterData, currentProgress] = await Promise.all([
          axios.get(`http://localhost:8080/chapters/${currentUser}`),
          axios.get(`http://localhost:8080/users/progress/${currentUser}`),
          // axios.get(`/.netlify/functions/chapters?userID=${currentUser}`),
          // axios.get(`/.netlify/functions/user/progress?userID=${currentUser}`),
        ]);
        setInitialContent(chapterData.data);
        setUserProgress(currentProgress.data.userProgress);
        setIsLoaded(true);
        if (!localStorage.getItem("chapters-tutorial")) {
          setChaptersTutorial(true);
        }
      } catch (error) {
        console.log(error + "Error retrieving chapter data");
      }
    };
    getChapters();
  }, []);

  useEffect(() => {
    // Preload images
    const imageUrls = [
      require("../assets/chapterAssets/introbag.png"),
      require("../assets/chapterAssets/tal1.png"),
      require("../assets/chapterAssets/mana1.png"),
      require("../assets/chapterAssets/edo1.png"),
      require("../assets/chapterAssets/igo1.png"),
      require("../assets/chapterAssets/all1.png"),
    ];

    let loadedImages = 0;
    const imgObjects = {};

    const onLoadImage = () => {
      loadedImages++;
      if (loadedImages === imageUrls.length) {
        setImagesLoaded(true);
      }
    };

    for (let key in imageUrls) {
      const img = new Image();
      img.src = imageUrls[key];
      imgObjects[key] = img;
      img.onload = onLoadImage;
    }

    setImagesArray(imgObjects);
  }, []);

  // return (
  //   <>
  //     {isLoaded ? (
  //       <>
  //       {chaptersTutorial && createPortal(<TutorialChapters toggle = {setChaptersTutorial}/>, document.body)}
  //       <ChaptersBlock
  //         content={initialContent}
  //         progress={userProgress}
  //         title="Chapters"
  //         level="chapters"
  //         destination="/home"
  //         setImageIsLoaded = {setImageLoaded}
  //       />
  //       <GoNextContent/>
  //       </>
  //     ) : (
  //       <div className="loader__container">
  //       <Loader />
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <>
      {isLoaded && imagesLoaded ? (
        <>
          {chaptersTutorial &&
            createPortal(
              <TutorialChapters toggle={setChaptersTutorial} />,
              document.body
            )}
          <ChaptersBlock
            content={initialContent}
            progress={userProgress}
            title="Chapters"
            level="chapters"
            destination="/home"
            imagesArray={imagesArray}
          />
          <GoNextContent />
        </>
      ) : (
        <UnitSkeleton content={initialContent} />
      )}
    </>
  );
};

export default ChaptersSlidesPage;
