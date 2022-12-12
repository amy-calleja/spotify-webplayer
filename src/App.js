import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const SPOTIFY_CLIENT_ID = "69897710f2d0434abc037aaeaf3713fe"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [ token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")

  useEffect(() =>{
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
      
    }
      setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = (e) => {
    const {data} = axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    console.log(data);
  }

  return (
    <div className= "App">
      <div className="App-header">
        <h1>Spotify App</h1>

        {!token ? 
        <a href= {`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
         : <button onClick={logout}>Logout</button>}

         {token ?
         <form onSubmit={searchArtists}>
          <input type="text" onChange={e => setSearchKey(e.target.value)} />
          <button>Search</button>
         </form>

         : <h2>Please login</h2>
         }

    </div>
  </div>
  );
}

export default App;