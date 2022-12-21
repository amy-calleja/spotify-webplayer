import React,{ useState, useEffect }  from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ token, trackUri}) {

    const [play, setPlay] = useState(true)

    useEffect(() => setPlay(true), [trackUri])
    
    if (!token) return null;
    
    return(
        <div>
            <SpotifyPlayer token={token} callback={state => { if (!state.isPlaying) setPlay(false)}} showSaveIcon uris={trackUri ? [trackUri] : []} play={play}/>
        </div>
    );
}