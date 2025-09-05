//to add functionality to each song like/remove from liked button
import { togglePlayerState, getPlayingSong, setPlayingSong } from '../store/player.actions'
import { getDuration } from "../services/util.service";
import { findOnYoutube } from '../services/songs/songs.service.js';
export function SongList ({song, index}){
    
    function timeAddedAgo(){
        const currentTime = Date.now()
        const timeSinceAdded = currentTime - song.dateAdded
        const seconds = Math.floor(timeSinceAdded/1000)
        const minutes = Math.floor(seconds/60)
        const hours = Math.floor(minutes/60)
        const days = Math.floor(hours/24)
        if(days) return days+' days ago'
        if(hours) return hours +' hours ago'
        if(minutes) return minutes +' minutes ago'
        if(seconds) return seconds +' seconds ago'
        return timeSinceAdded+' ms ago'
    }

    return(
        <div className="song-preview-container">
            <div className="song-preview">
                <div className="song-index" onClick={() => {setPlayingSong(song)
                    findOnYoutube(song)
                }}>
                    <svg width='16px' height='16px' viewBox="0 0 24 24">
                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"/>
                    </svg>
                    <p>{index + 1}</p>
                </div>
                <div className="song-thumbnail"><img src={song.cover}/></div>
                <p className="song-title">{song.name}</p>
                <p className="song-added">{timeAddedAgo()}</p>
                <p className="song-length">{getDuration('ms', song.durationMs)}</p>
            </div>
        </div>
    )

}