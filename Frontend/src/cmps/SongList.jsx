//to add functionality to each song like/remove from liked button
//to add functionality to song index and turn it into the number into play button when hovered over

export function SongList ({song, index}){
    function toDate(timestamp){
        if(!timestamp) return 'no date specified'
        const songDate = new Date(timestamp);
        const dateString = songDate.toLocaleDateString()
        return dateString;
    }

    return(
        <div className="song-preview-container">
            <div className="song-preview">
                <div className="song-index">
                    <svg width='16px' height='16px' viewBox="0 0 24 24">
                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"/>
                    </svg>
                    <p>{index + 1}</p>
                </div>
                <div className="song-thumbnail"><img src={song.cover}/></div>
                <p className="song-title">{song.name}</p>
                <p className="song-added">{toDate(song.dateAdded)}</p>
                <p className="song-length">{song.durationMs}</p>
            </div>
        </div>
    )

}