import "../styles/ChaptersPage.scss";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import ChaptersBlock from "../components/ChaptersBlock/ChaptersBlock";
import { useNavigate } from 'react-router-dom';

const UnitsSlidesPage = ({isLoggedIn}) => {
    const {chapterID, sectionID} = useParams()
    const currentUser = sessionStorage.getItem('userId')

    const navigate = useNavigate()
    useEffect(() => {
      if (!isLoggedIn) {
        if (!sessionStorage.getItem('authToken')) {
          navigate('/')
        }
      } 
  }, [isLoggedIn])

  const [contentToLoad, setContentToLoad] = useState(null)
  const [contentTitle, setContentTitle] = useState('')
  const [sectionLevel, setSectionLevel] = useState('sections')
  const [userProgress, setUserProgress] = useState(null)


  useEffect(() => {
    //if no unitId and ONLY id param, then they're on page to select specific Section
    if (sectionID) {   
     setSectionLevel('units')
     const getUnitDetails = async () => {
       try {
        const [unitData, currentProgress] = await Promise.all([
            axios.get(`http://localhost:8080/chapters/units/${currentUser}/${sectionID}`),
            axios.get(`http://localhost:8080/users/progress/${currentUser}`)
        ])
         setContentToLoad(unitData.data)
         setContentTitle(unitData.data[0].title)
         setUserProgress(currentProgress.data.userProgress)
       } catch(err) {
         console.log('Error in getting new data' + err);
       }
     }
     getUnitDetails()
   }
}, [chapterID, sectionID])

    if (!contentToLoad) {
        return <Loader/>
      }
    
      return (
        <div className = "wrapper">
            <ChaptersBlock content = {contentToLoad} title = {contentTitle} level = {sectionLevel} progress = {userProgress}/>
        </div>
      );
};

export default UnitsSlidesPage;

//fix the locations of these files, add animation