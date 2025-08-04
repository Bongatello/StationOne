import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { AudioPlayer } from '../cmps/AudioPlayer.jsx'

export function Browse() {



    return(
        <div className="browse-page">
            <h1>Browse all</h1>
            <p>Here I will add some genres from Youtube and Spotify API</p>
            <div className='music-player'>
                <AudioPlayer url={'https://www.youtube.com/watch?v=A2VpR8HahKc'}/>
            </div>

            

        </div>
    )
}