import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

import { SongsSearchResults } from "../cmps/MainContentCmps/SongsSearchResults.jsx"
import { songsService } from "../services/songs/songs.service.js"
import { SearchResultCard } from "../cmps/MainContentCmps/SearchResultCard.jsx"
import { getTopResult } from "../services/util.service.js"

export function SearchResultsPage() {
    const user = useSelector(state => state.userModule.user)
    const allParams = useParams()
    const params = allParams.searchParams
    const [querySongs, setQuerySongs] = useState([])
    const [queryArtists, setQueryArtists] = useState([])
    const [queryAlbums, setQueryAlbums] = useState([])
    const [queryPlaylists, setQueryPlaylists] = useState([])
    const containerRef = useRef()
    const [visibleCount, setVisibleCount] = useState(3)
    const [topResult, setTopResult] = useState({})

    useEffect(() => {
        updateVisible()
        window.addEventListener("resize", updateVisible)
        return () => window.removeEventListener("resize", updateVisible)
    }, [])


    useEffect(() => {
        console.log('Logging params to see what they look like: ', params)
        spotifySongQuery()
    }, [params])


    function updateVisible() {
        const width = containerRef.current?.offsetWidth
        if (!width) return // avoid undefined
        if (width < 686) setVisibleCount(3)
        else if (width < 873) setVisibleCount(4)
        else if (width < 1152) setVisibleCount(5)
        else if (width < 1332) setVisibleCount(6)
        else if (width < 1512) setVisibleCount(7)
        else if (width < 1692) setVisibleCount(8)
        else if (width < 1872) setVisibleCount(9)
        else setVisibleCount(10)
    }

    async function spotifySongQuery() {
        const songsLimit = 4
        const otherLimit = 10
        const queriedSongs = await songsService.querySpotifyByText(params, songsLimit, 'track')
        const queriedArtists = await songsService.querySpotifyByText(params, otherLimit, 'artist')
        const queriedAlbums = await songsService.querySpotifyByText(params, otherLimit, 'album')
        const queriedPlaylists = await songsService.querySpotifyByText(params, otherLimit, 'playlist')
        setTopResult(getTopResult(params, queriedSongs, queriedArtists, queriedAlbums, queriedPlaylists))
        console.log(topResult)
        setQuerySongs(queriedSongs)
        setQueryArtists(queriedArtists)
        setQueryAlbums(queriedAlbums)
        setQueryPlaylists(queriedPlaylists)
    }

    if (!queryPlaylists) return <div></div>
    return (
        <section className="search-results-page">
            <div className="results-sorting-methods">Maybe All, Songs, Artists, Albums, Playlists search results sortings later on</div>
            <div className="all-results-wrapper">
                <div className="top-result-container">
                    <h2>Top result</h2>
                    <div className="top-result-details-wrapper">
                        <img src={topResult.thumbnail} style={topResult.type === 'Artist' ? { borderRadius: '50%' } : { borderRadius: '6px' }} />
                        <div className="top-result-text">
                            <h2>{topResult.title}</h2>
                            <div className="top-result-type-artist">
                                <p className="top-result-type">{topResult.type} • </p>
                                <p className="top-result-artist">{topResult.artist}</p>
                            </div>
                        </div>
                    </div>
                    <div className="play-button">
                        <svg height="24px" width="24px" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" /></svg>
                    </div>
                </div>
                <div className="songs-container">
                    <h2>Songs</h2>
                    <div className="songs-list">
                        {querySongs.map(song => {
                            return (
                                <ul key={song.spotifyId}>
                                    <SongsSearchResults song={song} />
                                </ul>
                            )
                        })}
                    </div>
                </div>
                <div className="artists-container">
                    <h2>Artists</h2>
                    <div ref={containerRef} className="artists-list" style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}>
                        {queryArtists.slice(0, visibleCount).map((artist, index) => (
                            <SearchResultCard key={artist.spotifyId} item={artist} type="artist" index={index} />
                        ))}
                    </div>
                </div>
                <div className="albums-container">
                    <h2>Albums</h2>
                    <div ref={containerRef} className="albums-list" style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}>
                        {queryAlbums.slice(0, visibleCount).map((album, index) => (
                            <SearchResultCard key={album.spotifyId} item={album} type="album" index={index} />
                        ))}
                    </div>
                </div>
                <div className="playlists-container">
                    <h2>Playlists</h2>
                    <div ref={containerRef} className="playlists-list" style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}>
                        {queryPlaylists.slice(0, visibleCount).map((playlist, index) => (
                            <Link to={`/StationOne/playlist/${playlist.spotifyApiId}`}>
                                <SearchResultCard key={playlist.spotifyId} item={playlist} type="playlist" index={index} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}



//for the algorithm, from my tests the flow is: best result = playlist that the user liked, if not then ->
//keyword list (searching for sax, guitar, electro, etc) will lead to top result be a genre/playlist
//perfectly matching (with only 1 flaw) first artist that the user has liked songs from (probably the algo is way smarter than just that)
//first matching song