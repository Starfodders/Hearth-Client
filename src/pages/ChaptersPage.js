import React from 'react';
import topwave from "../assets/images/top-wave.svg"
import "../styles/ChaptersPage.scss"
import Chapters from "../components/Chapters/Chapters"
import Loader from "../components/Loader/Loader";

import axios from "axios";
import { useState, useEffect } from "react";


const ChaptersPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [initialContent, setInitialContent] = useState(null)

    //handles initial content which is overall chapters
    useEffect(() => {
        const getChapters = async () => {
          try {
            const response = await axios.get('http://localhost:8080/chapters')
            setInitialContent(response.data)
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
            {isLoaded ? <Chapters initial = {initialContent}/> : <Loader/>}
        </div>
    );
};

export default ChaptersPage;