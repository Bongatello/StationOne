import { stationService } from "../services/station/station.service.js"
import { useParams } from "react-router"
import { getStations, editStation } from "../store/station.actions.js"
import { useSelector } from "react-redux"
import { setPlayerStation } from '../store/player.actions';

export function StationQuerySongList({song}){
    const params = useParams()
    const station = useSelector(state => state.stationModule.selectedStation)

    async function addSongToStation(){
        const songs = station.songs
        const songToAdd = {
            cover: song.images[2].url,
            name: song.songName,
            artists: song.artists.join(', '),
            durationMs: song.durationMs,
            album: song.albumName,
            dateAdded: Date.now(),
            _id: song._id
        }
        songs.push(songToAdd)
        const editedStation = {
            _id: params.stationId,
            songs: songs
        }
        await editStation(editedStation)
        await setPlayerStation(params.stationId)
        return
    }

    return(
        <div className="station-query-song-list-wrapper">
            <div className="content">
                <div className="song-cover"><img src={song.images[0].url}/></div>
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