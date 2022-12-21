import React from 'react'


export default function SearchResults(props) {

    let tracks = props.tracks;
    let albums = props.albums;
    let artists = props.artists;
    
    const renderTracks = () => {
        return tracks.map(track => (
          <div key={tracks.id}>
            <br />
            {track.name} - {track.artists[0].name}
            {track.album.images.length? <img width={"100%"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
          </div>
        ))
      }

      const renderAlbums = () => {
        return albums.map(album => (
          <div key={albums.id}>
            {album.images.length? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
            <a href= {`/`}>{album.name}</a>
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
      

    return(
        <div >
            <br />
            <br />
            <em>Results:</em>

           {renderTracks()}
           {renderAlbums()}
           {renderArtists()}
                

        </div>
    );
}