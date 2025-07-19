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
                <p className="song-index">{index + 1}</p>
                <div className="song-thumbnail"><img src={song.imgUrl}/></div>
                <p className="song-title">{song.title}</p>
                <p className="song-added">{toDate(song.addedAt)}</p>
                <p className="song-length">song-length</p>
            </div>
        </div>
    )

}