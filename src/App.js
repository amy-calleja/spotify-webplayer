import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import WebPlayback from './WebPlayback';

function App() {

  const SPOTIFY_CLIENT_ID = "69897710f2d0434abc037aaeaf3713fe"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [ token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])

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
    console.log(data.albums.items)
  }

  const renderAlbums = () => {
    return albums.map(album => (
      <div key={albums.id}>
        {album.images.length? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
        <a href= {album.uri}>{album.name}</a>
      </div>
    ))
  }


    const renderArtists = () => {
      return artists.map(artist => (
        <div key={artist.id}>
          {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
          {artist.name}
        </div>
      ))
    }

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
            <span>Search Artists: </span>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type={"submit"}>GO</button>
          </form>

          <form onSubmit={searchAlbums}>
            <span>Search Albums: </span>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type={"submit"}>GO</button>
          </form>
          <WebPlayback token={token} />
         </>
         : <h2>Please login</h2>
         }
        
        {renderAlbums()}
        
        {renderArtists()}
        
    </div>
  </div>
  );
}

export default App;