import { getYoutubeSong, queryByText } from '../services/youtube-spotify.service.js'
import React, { useRef, useState, useEffect } from 'react'
import { StationQuerySongList } from './StationQuerySongList.jsx'

export function StationSongQuery() {
    const spotifyInputQuery = useRef('')
    const [querySongs, setQuerySongs] = useState([])

    async function spotifyQuery() {
        const text = spotifyInputQuery.current.value
        const queriedSongs = await queryByText(text)
        setQuerySongs(queriedSongs)
    }

    return (
        <div>
            <div className="playlist-song-query-wrapper">
                <div className="main-actions">
                    <div className="text-input-wrapper">
                        <h1>Let's find something for your playlist</h1>
                        <div className="query">
                            <svg height="16px" width="16px" viewBox="0 0 16 16" className="query-button" onClick={spotifyQuery}>
                                <path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5M.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7" />
                            </svg>
                            <input type="text" placeholder="Search for songs" ref={spotifyInputQuery}></input>
                        </div>
                    </div>

                    <svg height="24px" width="24px" viewBox="0 0 24 24" className="close-button">
                        <path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414" />
                    </svg>
                </div>
            </div>

            <div className='spotify-query-list'>
                {querySongs.length > 0 && querySongs.map(song => {
                    return (
                        <ul key={song._id}>

                            <StationQuerySongList song={song} />

                        </ul>
                    )
                })}
            </div>

        </div>
    )
}