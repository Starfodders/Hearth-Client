import React from 'react';
import topwave from "../assets/images/top-wave.svg"
import "../styles/ChaptersPage.scss"
import Chapters from "../components/Chapters/Chapters"
import Loader from "../components/Loader/Loader";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const ChaptersPage = ({isLoggedIn}) => {

  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem('authToken')) {
        navigate('/')
      }
    } 
}, [isLoggedIn])

  const [isLoaded, setIsLoaded] = useState(false)
  const [initialContent, setInitialContent] = useState(null)
  const [userProgress, setUserProgress] = useState(null)
  const currentUser = sessionStorage.getItem('userId')

    //handles initial content which is overall chapters
    useEffect(() => {
        const getChapters = async () => {
          try {
            const [chapterData, currentProgress] = await Promise.all([
              axios.get(`http://localhost:8080/chapters/${currentUser}`),
              axios.get(`http://localhost:8080/users/progress/${currentUser}`)
            ])
            setInitialContent(chapterData.data)
            setUserProgress(currentProgress.data.userProgress)
            setTimeout(() => {
                setIsLoaded(true)
            }, 1000)
          }catch(error) {
            console.log(error + 'Error retrieving chapter data');
          }
        }
        getChapters()
      },[])
      
    return (
        <div className = "wrapper">
            <div className = "chapters__bg">
                <img src = {topwave} className = "chapters__bg--img" alt = "moving waves"/>
            </div>
            {isLoaded ? <Chapters initial = {initialContent} progress = {userProgress}/> : <Loader/>}
        </div>
    );
};

export default ChaptersPage;