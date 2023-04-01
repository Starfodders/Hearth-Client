import "./Chapters.scss";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader"

const Chapters = () => {
    const [chapterData, setChapterData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const getChapters = async () => {
            try {
                axios.get('http://localhost:8080/chapters')
                .then((response) => {
                    setChapterData(response.data)
                    setTimeout(() => {
                      setIsLoaded(true)
                    }, 1250)
                })
            }catch(error) {
                console.log(error);
            }
        }
        getChapters()
    }, [])

    if (!isLoaded) {
        return <Loader/>
    }
    
  return (
    <div className="chapters__container">
      <div className="chapters__header">
        <h1 className="chapters__title">Chapters</h1>
      </div>
      <div className="chapters__main">
        {chapterData.map((chapter) => {
          return <Card
            id = {chapter.id}
            name = {chapter.name}
            sections = {chapter.sections}
            images = {chapter.images}
            available = {chapter.available}
          />
        })}
      </div>
    </div>
    
  );
};

export default Chapters;
