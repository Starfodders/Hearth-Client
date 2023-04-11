import "./Chapters.scss";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import ChaptersBlock from "../ChaptersBlock/ChaptersBlock";


const Chapters = ({initial, progress}) => {
  const {chapterID, sectionID} = useParams()

  const location = useLocation();
  const currentUser = sessionStorage.getItem('userId')

  // const [isLoaded, setIsLoaded] = useState(false)
  const [initialContent, setInitialContent] = useState(initial)
  const [contentToLoad, setContentToLoad] = useState(null)
  const [contentTitle, setContentTitle] = useState('Chapters')
  const [sectionLevel, setSectionLevel] = useState('chapters')

  //resets state to this when they're back on /Chapters
  useEffect(() => {
   if (location.pathname === '/chapters')
    setSectionLevel('chapters')
    setContentTitle('Chapters')
    setContentToLoad(initialContent)
  },[location])

  //if unitID exists as param, they're on page to select specific Unit
  useEffect(() => {
    if (sectionID) {
      setSectionLevel('units')
      const getUnitDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/chapters/units/${currentUser}/${sectionID}`)
          setContentToLoad(response.data)   
          setContentTitle(response.data[0].title)
        }
        catch(err) {
          console.log(err + 'Error getting unit data');
        }
      }
      getUnitDetails();
    }
    //if no unitId and ONLY id param, then they're on page to select specific Section
    if (!sectionID && chapterID) {
      setSectionLevel('sections')
      const getNewDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/chapters/sections/${currentUser}/${chapterID}`)
          setContentToLoad(response.data)
          setContentTitle(response.data[0].title)

        } catch(err) {
          console.log('Error in getting new data' + err);
        }
      }
      getNewDetails()
    }
  }, [chapterID, sectionID])

  if (!contentToLoad) {
    return <Loader/>
  }


  return (
      <ChaptersBlock content = {contentToLoad} title = {contentTitle} level = {sectionLevel} progress = {progress}/>
  );
};

export default Chapters;
