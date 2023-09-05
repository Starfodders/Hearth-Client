import "../styles/ChaptersPage.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import ChaptersBlock from "../components/ChaptersBlock/ChaptersBlock";
import GoNextContent from "../components/GoNextContent/GoNextContent";
import { useNavigate } from "react-router-dom";

const SectionsSlidesPage = ({ isLoggedIn }) => {
  const { chapterID, sectionID } = useParams();
  const currentUser = sessionStorage.getItem("userId");

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem("authToken")) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  const [contentToLoad, setContentToLoad] = useState(null);
  const [contentTitle, setContentTitle] = useState("");
  const [sectionLevel, setSectionLevel] = useState("sections");
  const [userProgress, setUserProgress] = useState(null);

  useEffect(() => {
    // if no unitId and ONLY id param, then they're on page to select specific Section
    if (!sectionID && chapterID) {
      setSectionLevel("sections");
      const getNewDetails = async () => {
        try {
          const [sectionData, currentProgress] = await Promise.all([
            // axios.get(
            //   `http://localhost:8080/chapters/sections/${currentUser}/${chapterID}`),
            // axios.get(`http://localhost:8080/users/progress/${currentUser}`),
            axios.get('/.netlify/functions/chapters/sections', {
              params: {
                userID: currentUser,
                chapterID: chapterID
              }
            }),axios.get(`/.netlify/functions/user/progress?userID=${currentUser}`)
          ]);
          setContentToLoad(sectionData.data);
          setContentTitle(sectionData.data[0].title);
          setUserProgress(currentProgress.data.userProgress);
        } catch (err) {
          console.log("Error in getting new data" + err);
        }
      };
      getNewDetails();
    }
  }, [chapterID, sectionID]);

  if (!contentToLoad) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <meta name = "description" content = "Choose from selected chapter's available sections"/>
        <meta name = "keywords" content = "Chapters, Sections, Units"/>
      </Helmet>
      <ChaptersBlock
        content={contentToLoad}
        title={contentTitle}
        level={sectionLevel}
        progress={userProgress}
        destination="/chapters"
      />
        <GoNextContent/>
    </div>
  );
};

export default SectionsSlidesPage;
