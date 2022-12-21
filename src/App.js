import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import WebPlayback from './WebPlayback';
import SearchResults from './SearchResults';


function App() {

  const SPOTIFY_CLIENT_ID = "69897710f2d0434abc037aaeaf3713fe"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [ token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [tracks, setTracks] = useState([])

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

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
      
    })
  
    setArtists(data.artists.items)
  }


  const searchAlbums = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      params: {
        q: searchKey,
        type: "album,track"
      }
    })

    setAlbums(data.albums.items)
  }

  const searchTracks = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      params: {
        q: searchKey,
        type: "track"
      }
    })

    setTracks(data.tracks.items)
    console.log(data.tracks)
  }
  
  /*const togglePlayAlbum = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/player/play", {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }, 
      context: {
        context_uri: "uri"
      }
    })
  }  */

  return (
    <div className= "App">
      <div className="App-header">
        
        {!token ? 
        <a href= {`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
         : <button onClick={logout}>Logout</button>}

      <h1>Spotify App</h1>

         {token ?
        <>
          <form onSubmit={searchArtists}>
            <span>Artists: </span>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>GO</button>
          </form>

          <form onSubmit={searchAlbums}>
            <span>Albums: </span>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>GO</button>
          </form>

          <form onSubmit={searchTracks}>
            <span>Songs: </span>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>GO</button>
          </form>

          <SearchResults tracks={tracks} albums={albums} artists={artists}/>

          <WebPlayback token={token} uri={albums.uri}/>
         </>
         : <h2>Please login</h2>
         }        
                              
    </div>
  </div>
  );
}

export default App;