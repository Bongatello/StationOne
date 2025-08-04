import React from 'react'
import ReactPlayer from 'react-player'
import { AudioPlayer } from '../cmps/AudioPlayer.jsx'

export function AppFooter() {

    return (
        <footer className="app-footer">
            <AudioPlayer/>
        </footer>
    )
}