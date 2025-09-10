//to add functionality to each song like/remove from liked button
import { togglePlayerState, getPlayingSong, setPlayingSong, setPlayerStation } from '../store/player.actions'
import { getDuration } from "../services/util.service";
import { songsService } from '../services/songs/songs.service.js';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editStation } from '../store/station.actions.js';
import SvgIcon from './SvgIcon.jsx';
import { makeNewPlaylistCover } from '../services/station/station.service.js';


export function SongList({ song, index }) {
    const playerData = useSelector(state => state.playerModule)
    const station = useSelector(state => state.stationModule.selectedStation)
    const user = useSelector(state => state.userModule.user)
    const params = useParams()

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
        if (songs.length === 4 || songs.length === 1 || songs.length === 0) editedStation.thumbnail = makeNewPlaylistCover(songs)
        await editStation(editedStation, user)
        await setPlayerStation(station._id)
        return console.log('Removed song from station')
    }

    function playPauseLogic() {
        if (!(song._id === playerData.player.currentSong._id)) {
            songsService.findOnYoutube(song)
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