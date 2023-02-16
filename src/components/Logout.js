import React from 'react';
import { useState, useEffect} from "react";
import { useLocalState } from '../util/useLocalStorage';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [hasLoaded, setHasLoaded] = useState();

    useEffect(()=>{
        fetch("/auth/logout").then((response) => {
            if (response.status === 200) {
              localStorage.clear();
              navigate("/");
              setHasLoaded(true);
            }
          });
    },[]);

  return (
    hasLoaded ? <div> </div> : <p> Loading </p>
  )
}

export default Logout;