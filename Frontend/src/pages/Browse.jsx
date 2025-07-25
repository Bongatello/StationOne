import React from 'react'
import ReactPlayer from 'react-player'

export function Browse() {
    return(
        <div className="browse-page">
            <h1>Browse all</h1>
            <p>Here I will add some genres from Youtube and Spotify API</p>
            <ReactPlayer src='https://www.youtube.com/watch?v=1W5BA0lDVLM&list=RD1W5BA0lDVLM&start_radio=1' light='true' />
        </div>
    )
}