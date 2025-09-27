import { stationService } from "../../services/station/station.service.js"
import { useParams } from "react-router"
import { getStations, editStation } from "../../store/station.actions.js"
import { useSelector } from "react-redux"
import { setPlayerStation } from '../../store/player.actions.js';
import { makeNewPlaylistCover } from "../../services/station/station.service.js";

export function StationQuerySongList({song}){
    const params = useParams()
    const station = useSelector(state => state.stationModule.selectedStation)
    const user = useSelector(state => state.userModule.user)

    async function addSongToStation(){
        const songs = station.songs
        const songToAdd = {
            cover: song.cover,
            name: song.songName,
            artists: song.artists.join(', '),
            durationMs: song.durationMs,
            album: song.albumName,
            dateAdded: Date.now(),
            spotifyId: song.spotifyId
        }
        songs.push(songToAdd)
        const editedStation = {
            _id: params.stationId || params.playlistId,
            songs: songs
        }
        if (songs.length === 4 || songs.length === 1 || songs.length === 0) editedStation.thumbnail = makeNewPlaylistCover(songs)
        await editStation(editedStation, user)
        await setPlayerStation(params.stationId || params.playlistId)
        return
    }

    return(
        <div className="station-query-song-list-wrapper">
            <div className="content">
                <div className="song-cover"><img src={song.cover}/></div>
                <div className="song-details">
                    <p>{song.songName}</p>
                    <div className="explicit-and-artists">
                        {song.isExplicit && <h6>E</h6>}
                        <p>{song.artists.join(', ')}</p>
                    </div>
                </div>
                <p className="song-album">{song.albumName}</p>
                <div className="song-add">
                    <button onClick={addSongToStation}>Add</button> 
                </div>

            </div>
        </div>
    )
}