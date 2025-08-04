import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { AudioPlayer } from '../cmps/AudioPlayer.jsx'
import { getYoutubeSong } from '../services/youtube-spotify.service.js'
import { setPlayingSong, getPlayingSong } from '../store/currently.actions.js'
import { useSelector } from 'react-redux'


export function Browse() {

    const currentlyData = useSelector(state => state.currentlyModule.currently)

    //const [songUrl, setSongUrl] = useState(null)
    const [inputData, setInputData] = useState('')

    async function getDataFromInput(data) {
        console.log('new input data: '+data)
        setInputData(data)
    }


    async function findOnYoutube() {
        
        const ytApiSearchData = await getYoutubeSong(inputData)
        const firstVideoId = ytApiSearchData.items[0].id.videoId

        const ytSongUrl = `https://www.youtube.com/watch?v=${firstVideoId}`

        setPlayingSong(ytSongUrl)
        //setSongUrl(ytSongUrl)
        console.log(ytSongUrl)
    }

    return(
        <div className="browse-page">
            <h1>Browse all</h1>
            <p>Here I will add some genres from Youtube and Spotify API</p>
            <div className='music-player'>
                <AudioPlayer url={currentlyData.currentSong}/>
            </div>
            <input type='text' onChange={(e) => getDataFromInput(e.target.value)} placeholder='Enter song name with artist'></input>
            <button onClick={findOnYoutube}>Lookup on youtube</button>
            <p>my youtube api key is: {import.meta.env.VITE_YOUTUBE_DATA_API_KEY}</p>

        </div>
    )
}