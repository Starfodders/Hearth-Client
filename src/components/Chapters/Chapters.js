import "./Chapters.scss";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

const Chapters = () => {
  const [chapterData, setChapterData] = useState([]);
  const [componentTitle, setComponentTitle] = useState('Chapters')
  // const [getImages, setGetImages] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [chapterDepth, setChapterDepth] = useState('chapters')
  const location = useLocation();

  const { id } = useParams();
  const [sectionData, setSectionData] = useState([]);

  //gets overall chapter information
  useEffect(() => {
    const getChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/chapters");
        setChapterData(response.data);
        if (chapterData) {
          setIsLoaded(true)
        }
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
    if (id) {
      const getSection = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/chapters/${id}`
          );
          setSectionData(response.data);
          getTitle()
        } catch (err) {
          console.log(err + "problem retrieving section data");
        }
      };
      getSection();
    }
  }, [id]);

  //retrieves specific section name and renders component title
  function getTitle() {
    const chosenSection = chapterData.find(section => section.id === parseInt(id))
    setComponentTitle(chosenSection.name)
  }

  useEffect(() => {
    setChapterDepth(location.pathname)
  }, [location])


  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="chapters__container">
      <div className="chapters__header">
        <h1 className="chapters__title">{id ? componentTitle: 'Chapters'}</h1>
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
                  depth = {chapterDepth}
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
                  depth = {chapterDepth}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Chapters;
