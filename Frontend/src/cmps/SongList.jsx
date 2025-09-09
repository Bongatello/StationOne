//to add functionality to each song like/remove from liked button
import { togglePlayerState, getPlayingSong, setPlayingSong, setPlayerStation } from '../store/player.actions'
import { getDuration } from "../services/util.service";
import { findOnYoutube } from '../services/songs/songs.service.js';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editStation } from '../store/station.actions.js';
import SvgIcon from './SvgIcon.jsx';

export function SongList({ song, index }) {
    const playerData = useSelector(state => state.playerModule)
    const station = useSelector(state => state.stationModule.selectedStation)
    const params = useParams()

    const playButton = <svg><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" /></svg>
    const pauseButton = <svg><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z" /></svg>
    const removeSongSVG = <svg height="16px" width="16px" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z" /></svg>

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

    async function removeSongFromStation() {
        const songs = station.songs
        const idx = songs.findIndex(funcSong => funcSong._id === song._id)
        songs.splice(idx, 1)
        const editedStation = {
            _id: station._id,
            songs: songs
        }
        await editStation(editedStation)
        await setPlayerStation(station._id)
        return console.log('Removed song from station')
    }

    function playPauseLogic() {
        if (!(song._id === playerData.player.currentSong._id)) {
            findOnYoutube(song)
            console.log('DEBUGGING::::: ', song)
            setPlayerStation(params.stationId)
            togglePlayerState(true)
        }
        else {
            togglePlayerState(!playerData.player.isPlaying)
        }
    }

    return (
        <div className="song-preview-container">
            <div className={song._id === playerData.player.currentSong._id ? "playing-song-preview song-preview" : "song-preview"}>
                <div className="song-index" onClick={() => { playPauseLogic() }}>

                        {(!playerData.player.isPlaying || !(song._id === playerData.player.currentSong._id)) && <SvgIcon iconName={"songListPlayButton"} />} {/* song is not playing OR song is not selected, show play button */}
                        {playerData.player.isPlaying && song._id === playerData.player.currentSong._id && <SvgIcon iconName={"songListPauseButton"} />} {/* song is playing AND song is selected, show pause button */}

                    <p>{index + 1}</p>
                </div>
                <div className="song-thumbnail"><img src={song.cover} /></div>
                <div className='song-title'>
                    <p>{song.name}</p>
                    <section className="explicit-and-artists">
                        {/* song.isExplicit && <h6>E</h6> */}
                        <p>{song.artists}</p>
                    </section>
                </div>
                <p className="song-album">{song.album}</p>
                <p className="song-added">{timeAddedAgo()}</p>
                <p className="song-length">
                    <div onClick={() => removeSongFromStation()}>{<SvgIcon iconName={"songListRemoveSong"} />}</div>
                    {getDuration('ms', song.durationMs)}
                </p>
            </div>
        </div>
    )

}