import React, { useEffect, useState } from 'react'
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebAPI from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from './DataLayer';


const spotify = new SpotifyWebAPI();


function App() {

  const [token, setToken] = useState(null);
  const [{user}, dispatch] = useDataLayerValue();


  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token);
      
      spotify.getMe().then(user => {
        // console.log('Person', user);

      dispatch({
        type: 'SET_USER',
        user: user
      })

      })
    }

      }, []);

  console.log('user', user)
  return (
    // BEM
    <div className="app">
      {
        token ? 
        <Player />
         : (<Login />)
      }

    </div>
  );
}

export default App;
