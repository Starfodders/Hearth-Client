import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';


const CollectionPage = ({isLoggedIn}) => {
    const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem('authToken')) {
        navigate('/')
      }
    } 
}, [isLoggedIn])
    return (
        <div>
            
        </div>
    );
};

export default CollectionPage;