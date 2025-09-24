import React, { useRef, useState, useEffect } from 'react'
import { StationQuerySongList } from './StationQuerySongList.jsx'
import { songsService } from '../../services/songs/songs.service.js'
import SvgIcon from '../SvgIcon.jsx'

export function StationSongQuery(props) {
    const spotifyInputQuery = useRef('')

    async function spotifyQuery() {
        const limit = 10
        const type = 'track'
        const text = spotifyInputQuery.current.value
        const queriedSongs = await songsService.querySpotifyByText(text, limit, type)
        props.updateQuerySongs(queriedSongs)
    }

    function toggleQuerySongs() {
        props.updateQuerySongs([]) //a simple line that was missing, which clears out the queried songs (upon closing the song query, the queried songs still stayed up)
        props.updateIsQuerySongs()
    }

    return (
        <div className='playlist-song-query-wrapper'>
            <div className="main-actions">
                <div>
                    {props.isQuerySongs &&
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
                    {!props.isQuerySongs &&
                        <h2 className='find-more'>Find more</h2>
                    }
                    {props.isQuerySongs &&
                        <SvgIcon iconName={"stationSpotifyQueryClose"} />
                    }
                </div>
            </div>


            <div className='spotify-query-list'>
                {props.querySongs.length > 0 && props.querySongs.map(song => {
                    return (
                        <ul key={song.spotifyId}>
                            <StationQuerySongList song={song} />
                        </ul>
                    )
                })}
            </div>

        </div>
    )
}