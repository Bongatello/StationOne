import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { StationsHomeList } from "../cmps/StationsHomeList.jsx"
import { useSelector } from 'react-redux'
import { getStations, getSpotifyStations } from "../store/station.actions.js"
export function HomePage() {
    const genres = ['Pop', 'Electronic', 'Hip-Hop', 'Techno', 'Hebrew']
    const stations = useSelector(state => state.stationModule.stations)
    const spotifyStations = useSelector(state => state.stationModule.spotifyStations)

    useEffect(() => {

        getStations()
        if (!spotifyStations) getSpotifyStations(genres.join(','))

    }, [])

    function postByGenre(genre) {
        console.log(spotifyStations)
        const spotifyStationsToDisplay = spotifyStations[genre]
        return spotifyStationsToDisplay.map(station => {
            return (
                <div className="home-station-wrapper">
                    <StationsHomeList station={station} genre={genre} />
                </div>
            )
        })
    }



    if (!stations || !stations.length || !spotifyStations) {
        return <p>Loading stations...</p>
    }
    return (
        <div className="homepage-container">
            <h1>*Here I will add some stations that were recently played by the user*</h1>

            <section className="homepage-genre-section">
                <h2>Pop Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Pop')}
                </div>
            </section>

            <section className="homepage-genre-section">
                <h2>Electronic Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Electronic')}
                </div>
            </section>

            <section className="homepage-genre-section">
                <h2>Hip-Hop Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Hip-Hop')}
                </div>
            </section>

            <section className="homepage-genre-section">
                <h2>Techno Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Techno')}
                </div>
            </section>

            <section className="homepage-genre-section">
                <h2>Hebrew Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Hebrew')}
                </div>
            </section>
        </div >
    )
}