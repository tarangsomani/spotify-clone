import React, { useEffect, useState } from 'react'
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebAPI from "spotify-web-api-js";

const spotify = new SpotifyWebAPI();


function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token);
      
      spotify.getMe().then(user => {
        console.log('Person', user);
      })
    }

      }, []);

  return (
    // BEM
    <div className="app">
      {
        token ? (<h1> I'm Logged in </h1>) : (<Login />)
      }

    </div>
  );
}

export default App;
