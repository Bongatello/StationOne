import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { setPlayingSong, getPlayingSong } from '../store/player.actions.js'
import { useSelector } from 'react-redux'
import { songsService } from '../services/songs/songs.service.js'
import { ImgUploader } from '../cmps/ImgUploader.jsx'

export function Browse() {
    const playerData = useSelector(state => state.playerModule.player)
    const [imageUrl, setImageUrl] = useState('')
    const [query, setQuery] = useState('')
    const [songs, setSongs] = useState([])

    

    useEffect(() => {
        initialSpotifyQuery()
    }, [])

    function onUploaded(imgUrl) {
        setImageUrl(imgUrl)
    }




    async function getDataFromSpotifyInput(data) {
        console.log('new input data: ' + data)
        setQuery(data)
    }

    async function initialSpotifyQuery() {
        const queriedSongs = await songsService.querySpotifyByText('omer adam')
        setSongs(queriedSongs)
    }


    async function findOnYoutube(song) { //upon removing notes, add spotifySongId to function dependencies
        const spotifySongId = song.spotifyId
        var firstVideoId = await songsService.getYoutubeId(spotifySongId)
        if (firstVideoId) console.log('no -100 credits this time :)')
        if (!firstVideoId) {
            const inputData = song.artists.join('') + '-' + song.songName
            const ytApiSearchData = await songsService.getYoutubeSong(inputData)
            console.log('Google Api Used, -100 credits :(')
            firstVideoId = ytApiSearchData.items[0].id.videoId
            const songToStore = {
                spotifySongId: spotifySongId,
                youtubeSongId: firstVideoId
            }
            await songsService.addSong(songToStore) // this function should add both ids under the same object in mongo, meaning next time we ask for the youtube id, we can check if there is a spotify id matching to the required song that the user wants to play
        }
        const ytSongUrl = `https://www.youtube.com/watch?v=${firstVideoId}`
        song.url = ytSongUrl
        setPlayingSong(song)
        console.log('Now playing: ', song)
    }

    async function spotifyQuery() {
        const queriedSongs = await songsService.querySpotifyByText(query)
        setSongs(queriedSongs)
    }

    return (
        <div className="browse-page">
            <h1>Browse all</h1>
            <p>Here I will add some genres from Youtube and Spotify API</p>

            <p>my youtube api key is: {import.meta.env.VITE_YOUTUBE_DATA_API_KEY}</p>

            <div className='lookup-spotify-songs'>
                <input type='text' onChange={(e) => getDataFromSpotifyInput(e.target.value)} placeholder='Enter spotify query'></input>
                <button onClick={() => spotifyQuery()}></button>
            </div>

            <div className='spotify-query-list'>
                {songs.length > 0 && songs.map(song => {
                    return (
                        <li key={song.spotifyId}>{song.artists.join(' ')} - {song.songName} <button onClick={() => songsService.findOnYoutube(song)}>Play Song</button></li>
                    )
                })}
            </div>
            
            <h1>under this im doing stuff.</h1>
            <ImgUploader onUploaded={onUploaded} stationImage={'https://misc.scdn.co/liked-songs/liked-songs-64.png'} />
            <img src={imageUrl} alt="i think there should be an image" />
        </div>
    )
}