import SvgIcon from "../SvgIcon"


export function SearchResultCard({ item, type, index }) {


    return (
        <div key={item.spotifyApiId} className={`search-result-card-wrapper ${type}-${index}`}>
            <div className="search-result-card">
                <div className="card-image">
                    <img src={item.thumbnail} />
                    <div className="play-button">
                        <svg height="24px" width="24px" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" /></svg>
                    </div>
                </div>

                <div className="search-result-card-text-details">
                    <p className="search-result-card-upper-text">{item.name}</p>
                    <p className="search-result-card-lower-text">{type === "playlist" ? `By ${item.addedBy}` : type === "artist" ? `Artist` : `${item.year} • ${item.artists}`}</p>
                </div>
            </div>
        </div>
    )
}


{/* <div className="play-pause-button-wrapper action-wrapper" onClick={playPauseLogic}>
    {playerData.player.isPlaying && (playerData.station._id === station._id) ? <SvgIcon iconName={"pauseButton"} /> : <SvgIcon iconName={"playButton"} />}
</div> */}