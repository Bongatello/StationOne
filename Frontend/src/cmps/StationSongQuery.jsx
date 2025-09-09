import React, { useRef, useState, useEffect } from 'react'
import { StationQuerySongList } from './StationQuerySongList.jsx'
import { songsService } from '../services/songs/songs.service.js'
import SvgIcon from './SvgIcon.jsx'
export function StationSongQuery() {
    const spotifyInputQuery = useRef('')
    const [querySongs, setQuerySongs] = useState([])
    const [isQuerySongs, setIsQuerySongs] = useState(false)

    async function spotifyQuery() {
        const text = spotifyInputQuery.current.value
        const queriedSongs = await songsService.queryByText(text)
        setQuerySongs(queriedSongs)
    }

    function toggleQuerySongs() {
        setIsQuerySongs(prev => !prev)
    }

    return (
        <div>
            <div className="playlist-song-query-wrapper">
                <div className="main-actions">
                    <div>
                        {isQuerySongs &&
                            <div className="text-input-wrapper">
                                <h1>Let's find something for your playlist</h1>
                                <div className="query">
                                    <div onClick={spotifyQuery}>
                                        <SvgIcon iconName={"stationSpotifyQuery"} />
                                    </div>
                                    <input type="text" placeholder="Search for songs" ref={spotifyInputQuery}></input>
                                </div>
                            </div>
                        }
                    </div>

                    <div onClick={toggleQuerySongs} className='toggler-wrapper'>
                        {!isQuerySongs &&
                            <h2 className='find-more'>Find more</h2>
                        }
                        {isQuerySongs &&
                            <SvgIcon iconName={"stationSpotifyQueryClose"}/>
                        }
                    </div>
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