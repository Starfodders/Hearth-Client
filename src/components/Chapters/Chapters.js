import "./Chapters.scss";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import ChaptersBlock from "../ChaptersBlock/ChaptersBlock";


const Chapters = ({initial}) => {
  const {id, unitId} = useParams()
  const location = useLocation();


  // const [isLoaded, setIsLoaded] = useState(false)
  const [initialContent, setInitialContent] = useState(initial)
  const [contentToLoad, setContentToLoad] = useState(null)
  const [contentTitle, setContentTitle] = useState('Chapters')
  const [sectionLevel, setSectionLevel] = useState(false)

  useEffect(() => {
   if (location.pathname === '/chapters')
    setSectionLevel(false)
    setContentToLoad(initialContent)
  },[location])

  useEffect(() => {
    if (unitId) {
      const getUnitDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/chapters/${id}/${unitId}`)
          setContentToLoad(response.data)
        }
        catch(err) {
          console.log(err + 'Error getting unit data');
        }
      }
      getUnitDetails();
    }
    if (!unitId && id) {
      setSectionLevel(true)
      const getNewDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/chapters/${id}`)
          setContentToLoad(response.data)
          getTitle(id)
        } catch(err) {
          console.log('Error in getting new data' + err);
        }
      }
      getNewDetails()
    }
  }, [id, unitId])

  function getTitle(id) {
    const chosenSection = initial.find(section => section.id === parseInt(id))
    setContentTitle(chosenSection.name)
  }

  if (!contentToLoad) {
    return <Loader/>
  }


  return (
      <ChaptersBlock content = {contentToLoad} title = {contentTitle} level = {sectionLevel}/>
  );
};

export default Chapters;


//on initial load, the contents will be GET from the backend for chapter data
//when retrieved, then display by mapping contents over the cards
//each card has a handler that changes the state of the data being rendered as their link pointer is also in state


//now when I click on the button,
//I need to know which chapter I selected
//their id will match the chapter ID 
//each button essentially sends up a specific ID
//capture that ID in state, when it changes then make a request to back end using this id

//now that i'm one level deep