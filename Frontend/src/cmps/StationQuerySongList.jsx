


export function StationQuerySongList({song}){

    console.log(song.songName)
    
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
                <p className="song-add">button</p>

            </div>
        </div>
    )
}