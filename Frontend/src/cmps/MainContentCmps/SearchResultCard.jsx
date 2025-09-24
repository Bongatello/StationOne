


export function SearchResultCard({ item, type, index }) {


    return (
        <div key={item.spotifyApiId} className={`search-result-card-wrapper ${type}-${index}`}>
            <div className="search-result-card">
                <img src={item.thumbnail} />
                <div className="search-result-card-text-details">
                    <p className="search-result-card-upper-text">{item.name}</p>
                    <p className="search-result-card-lower-text">{type === "playlist" ? `By ${item.addedBy}` : type === "artist" ? `Artist` : `${item.year} • ${item.artists}`}</p>
                </div>
            </div>
        </div>
    )
}