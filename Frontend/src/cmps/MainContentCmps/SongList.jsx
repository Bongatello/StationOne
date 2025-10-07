//to add functionality to each song like/remove from liked button
import { togglePlayerState, getPlayingSong, setPlayingSong, setPlayerStation } from '../../store/player.actions.js'
import { getDuration } from "../../services/util.service";
import { songsService } from '../../services/songs/songs.service.js';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editStation } from '../../store/station.actions.js';
import SvgIcon from '../SvgIcon.jsx';
import { makeNewPlaylistCover } from '../../services/station/station.service.js';


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

    function formatDate(isoString) {
        const date = new Date(isoString)
        return date.toLocaleDateString('en-US', {
            month: 'short',   // "Jan", "Feb", "Mar", etc.
            day: 'numeric',   // "1", "20", etc.
            year: 'numeric',  // "2023"
        })
    }

    async function removeSongFromStation() {
        const songs = station.songs
        const idx = songs.findIndex(funcSong => funcSong.spotifyId === song.spotifyId)
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
        if (!(song.spotifyId === playerData.player.currentSong.spotifyId)) {
            songsService.findOnYoutube(song)
            setPlayerStation(params.stationId ?? params.playlistId, user)
            togglePlayerState(true)
        }
        else {
            togglePlayerState(!playerData.player.isPlaying)
        }
    }

    return (
        <div className="song-preview-container">
            {/* ---Desktop Song Preview--- */}
            <div className={song.spotifyId === playerData.player.currentSong.spotifyId ? "playing-song-preview song-preview" : "song-preview"}>
                <div className="song-index" onClick={() => { playPauseLogic() }}>

                    {(!playerData.player.isPlaying || !(song.spotifyId === playerData.player.currentSong.spotifyId)) && <SvgIcon iconName={"songListPlayButton"} />} {/* song is not playing OR song is not selected, show play button */}
                    {playerData.player.isPlaying && song.spotifyId === playerData.player.currentSong.spotifyId && <SvgIcon iconName={"songListPauseButton"} />} {/* song is playing AND song is selected, show pause button */}

                    <p className='song-index-number'>{index + 1}</p>
                    {playerData.player.isPlaying && song.spotifyId === playerData.player.currentSong.spotifyId && <img className='playing-song-visualizer' src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif' height={'14px'} width={'14px'}></img>}
                    {!(playerData.player.isPlaying && song.spotifyId === playerData.player.currentSong.spotifyId) && <p className='playing-song-stopped'>{index + 1}</p>}
                </div>
                <div className='song-title'>
                    {song.cover && <img src={song.cover || song.images[0]?.url} />}
                    <div className='song-name-artists'>
                        <p>{song.name || song.songName}</p>
                        <section className="explicit-and-artists">
                            {/* song.isExplicit && <h6>E</h6> */}
                            <p>{typeof (song.artists) === 'string' ? song.artists : song.artists.join(', ')}</p>
                        </section>
                    </div>
                </div>
                {song.album && <p className="song-album">{song.album || song.albumName}</p>}
                {song.dateAdded && <p className="song-added">{typeof (song.dateAdded) === 'number' ? timeAddedAgo() : formatDate(song.dateAdded)}</p>}
                <p className="song-length">
                    {user.name === station.addedBy && <div onClick={() => removeSongFromStation()}>{<SvgIcon iconName={"songListRemoveSong"} />}</div>}
                    {!(user.name === station.addedBy) && <div></div>}
                    {getDuration('ms', song.durationMs)}
                </p>
            </div>
            {/* ---Mobile Song Preview--- */}
            <div className={song.spotifyId === playerData.player.currentSong.spotifyId ? "playing-song-preview song-preview-mobile" : "song-preview-mobile"} onClick={() => { playPauseLogic() }}>
                <div className='song-title'>
                    {song.cover && <img src={song.cover || song.images[0]?.url} />}
                    <div className='song-name-artists'>
                        <div className='title-visualizer'>
                            {playerData.player.isPlaying && song.spotifyId === playerData.player.currentSong.spotifyId && <img className='playing-song-visualizer' src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif' height={'14px'} width={'14px'}></img>}
                            <p>{song.name || song.songName}</p>
                        </div>
                        <section className="explicit-and-artists">
                            {/* song.isExplicit && <h6>E</h6> */}
                            <p>{typeof (song.artists) === 'string' ? song.artists : song.artists.join(', ')}</p>
                        </section>
                    </div>
                </div>
                <div className='song-options'>
                    <SvgIcon iconName={"extraOptions"} />
                </div>
            </div>
        </div>
    )

}