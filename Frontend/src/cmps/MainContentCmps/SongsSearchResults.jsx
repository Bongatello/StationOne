import { getDuration } from "../../services/util.service"


export function SongsSearchResults({ song }) {


    return (
        <div className="song-search-result">
            <img src={song.cover} />
            <div className="title-artists-wrapper">
                <p>{song.songName}</p>
                <div className="explicit-and-artists">
                    {song.isExplicit && <h6>E</h6>}
                    <p>{song.artists.join(', ')}</p>
                </div>
            </div>
            <p>{getDuration('ms', song.durationMs)}</p>
        </div>
    )
}