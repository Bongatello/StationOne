//to add functionality to each song like/remove from liked button
import { togglePlayerState, getPlayingSong, setPlayingSong, setPlayerStation } from '../store/player.actions'
import { getDuration } from "../services/util.service";
import { findOnYoutube } from '../services/songs/songs.service.js';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
export function SongList({ song, index }) {
    const playerData = useSelector(state => state.playerModule.player)
    const params = useParams()

    const playButton = <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" />
    const pauseButton = <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z" />

    function timeAddedAgo() {
        const currentTime = Date.now()
        const timeSinceAdded = currentTime - song.dateAdded
        const seconds = Math.floor(timeSinceAdded / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        if (days) return days + ' days ago'
        if (hours) return hours + ' hours ago'
        if (minutes) return minutes + ' minutes ago'
        if (seconds) return seconds + ' seconds ago'
        return timeSinceAdded + ' ms ago'
    }

    function playPauseLogic() {
        if (!(song._id === playerData.currentSong._id)) {
            setPlayingSong(song)
            setPlayerStation(params.stationId)
            findOnYoutube(song)
            togglePlayerState(true)
        }
        else {
            togglePlayerState(!playerData.isPlaying)
        }
    }

    return (
        <div className="song-preview-container">
            <div className={song._id === playerData.currentSong._id ? "playing-song-preview song-preview" : "song-preview"}>
                <div className="song-index" onClick={() => {playPauseLogic()}}>
                    <svg width='16px' height='16px' viewBox="0 0 24 24">
                        {(!playerData.isPlaying || !(song._id === playerData.currentSong._id)) && playButton} {/* song is not playing OR song is not selected, show play button */}
                        {playerData.isPlaying && song._id === playerData.currentSong._id && pauseButton} {/* song is playing AND song is selected, show pause button */}
                    </svg>
                    <p>{index + 1}</p>
                </div>
                <div className="song-thumbnail"><img src={song.cover} /></div>
                <div className='song-title'>
                    <p>{song.name}</p>
                    <div className="explicit-and-artists">
                        {song.isExplicit && <h6>E</h6>}
                        <p>{song.artists}</p>
                    </div>
                </div>
                <p className="song-added">{timeAddedAgo()}</p>
                <p className="song-length">{getDuration('ms', song.durationMs)}</p>
            </div>
        </div>
    )

}