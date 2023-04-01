import "./Chapters.scss";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

const Chapters = () => {
  const [chapterData, setChapterData] = useState([]);
  // const [getImages, setGetImages] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const [sectionData, setSectionData] = useState([]);

  //gets overall chapter information
  useEffect(() => {
    const getChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/chapters");
        setChapterData(response.data);
        setTimeout(() => {
          setIsLoaded(true);
        }, 750);
        //CODE FOR TRYING TO PRELOAD IMAGES
        // try {
        //   const tempImages = []
        //   chapterData.forEach((chapter) => {
        //     const image = new Image();
        //     image.src = (`http://localhost:8080${chapter.images}`)
        //     tempImages.push(image)
        //   })
        //   setGetImages(tempImages)
        //   setIsLoaded(true);
        // }
        // catch(error) {
        //   console.log(error + 'Problem preloading images');
        // }
      } catch (error) {
        console.log(error + "Problem retrieving Chapter Data");
      }
    };
    getChapters();
  }, []);

  //gets specific section information if ID param is present
  useEffect(() => {
    const getSection = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/chapters/${id}`
        );
        setSectionData(response.data);
      } catch (err) {
        console.log(err + "problem retrieving section data");
      }
    };
    getSection();
  }, [id]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="chapters__container">
      <div className="chapters__header">
        <h1 className="chapters__title">Chapters</h1>
      </div>
      <div className="chapters__main">
        {id
          ? sectionData.map((section) => {
              return (
                <Card
                  id={section.id}
                  name={section.name}
                  completed = {section.completed}
                  images={section.images}
                />
              );
            })
          : chapterData.map((chapter) => {
              return (
                <Card
                  id={chapter.id}
                  name={chapter.name}
                  sections={chapter.sections}
                  images={chapter.images}
                  available={chapter.available}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Chapters;
