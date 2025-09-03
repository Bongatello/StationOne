import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { AudioPlayer } from '../cmps/AudioPlayer.jsx'
import { getYoutubeSong, queryByText } from '../services/youtube-spotify.service.js'
import { setPlayingSong, getPlayingSong } from '../store/player.actions.js'
import { useSelector } from 'react-redux'
import { songsService } from '../services/songs/songs.service.js'


export function Browse() {
    const playerData = useSelector(state => state.playerModule.player)
    
    const [query, setQuery] = useState('')
    const [songs, setSongs] = useState([])


    useEffect(() => {
        initialSpotifyQuery()
    }, [])

    async function getDataFromSpotifyInput(data) {
        console.log('new input data: ' + data)
        setQuery(data)
    }

    async function initialSpotifyQuery() {
        const queriedSongs = await queryByText('omer adam')
        setSongs(queriedSongs)
    }


    async function findOnYoutube(song) { //upon removing notes, add spotifySongId to function dependencies
        const spotifySongId = song._id
        var firstVideoId = await songsService.getYoutubeId(spotifySongId)
        if (firstVideoId) console.log('no -100 credits this time :)')
        if (!firstVideoId) {
            const inputData = song.artists.join('') + '-' + song.songName
            const ytApiSearchData = await getYoutubeSong(inputData)
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
        const queriedSongs = await queryByText(query)
        setSongs(queriedSongs)
    }

    return (
        <div className="browse-page">
            <h1>Browse all</h1>
            <p>Here I will add some genres from Youtube and Spotify API</p>
            <div className='music-player'>
                <AudioPlayer url={playerData.currentSong} />
            </div>

            <p>my youtube api key is: {import.meta.env.VITE_YOUTUBE_DATA_API_KEY}</p>

            <div className='lookup-spotify-songs'>
                <input type='text' onChange={(e) => getDataFromSpotifyInput(e.target.value)} placeholder='Enter spotify query'></input>
                <button onClick={spotifyQuery}></button>
            </div>

            <div className='spotify-query-list'>
                {songs.length > 0 && songs.map(song => {
                    return (
                        <li key={song._id}>{song.artists.join(' ')} - {song.songName} <button onClick={() => findOnYoutube(song)}>Play Song</button></li>
                    )
                })}
            </div>

        </div>
    )
}