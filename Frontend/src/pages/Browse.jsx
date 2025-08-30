import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { AudioPlayer } from '../cmps/AudioPlayer.jsx'
import { getYoutubeSong, queryByText } from '../services/youtube-spotify.service.js'
import { setPlayingSong, getPlayingSong } from '../store/currently.actions.js'
import { useSelector } from 'react-redux'


export function Browse() {
    const currentlyData = useSelector(state => state.currentlyModule.currently)

    const [query, setQuery] = useState('')
    const [songs, setSongs] = useState([])


    useEffect(() => {
        initialSpotifyQuery()
    }, [])

    async function getDataFromSpotifyInput(data) {
        console.log('new input data: '+data)
        setQuery(data)
    }

    async function initialSpotifyQuery() {
        const queriedSongs = await queryByText('omer adam')
        setSongs(queriedSongs)
    }


    async function findOnYoutube(inputData) {
        
        const ytApiSearchData = await getYoutubeSong(inputData)
        const firstVideoId = ytApiSearchData.items[0].id.videoId

        const ytSongUrl = `https://www.youtube.com/watch?v=${firstVideoId}`

        setPlayingSong(ytSongUrl)
        //setSongUrl(ytSongUrl)
        console.log(ytSongUrl)
    }

    async function spotifyQuery() {
        const queriedSongs = await queryByText(query)
        setSongs(queriedSongs)
    }

    return(
        <div className="browse-page">
            <h1>Browse all</h1>
            <p>Here I will add some genres from Youtube and Spotify API</p>
            <div className='music-player'>
                <AudioPlayer url={currentlyData.currentSong}/>
            </div>

            <p>my youtube api key is: {import.meta.env.VITE_YOUTUBE_DATA_API_KEY}</p>

            <div className='lookup-spotify-songs'>
                <input type='text' onChange={(e) => getDataFromSpotifyInput(e.target.value)} placeholder='Enter spotify query'></input>
                <button onClick={spotifyQuery}></button>
            </div>

            <div className='spotify-query-list'>
                {songs.length>0 && songs.map(song =>{
                    return(
                    <li key={song._id}>{song.artists.join(' ')} - {song.songName} <button onClick={() => findOnYoutube(song.artists.join('') + '-' + song.songName)}>Play Song</button></li>
                    )
                })}
            </div>

        </div>
    )
}