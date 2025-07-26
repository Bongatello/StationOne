import { Link } from "react-router-dom";
import { stationService } from "../services/station/station.service.js"
import { useEffect, useState } from "react";
import { StationsHomeList } from "../cmps/StationsHomeList.jsx"
import { loadFromStorage } from "../services/util.service.js";
import { useSelector } from 'react-redux'
import { setStations } from "../store/stations.actions.js";

export function HomePage() {
    
    const stations = useSelector(state => state.stationsModule.stations)

    useEffect(() => {

        setStations()

    }, [])

    function postByGenre(genre){
        return stations.map(station => {
            if(station.tags.includes(genre)){
                return (
                    <div className="home-station-wrapper">
                        <StationsHomeList station={station} genre={genre}/>
                    </div>
                    )
            }
        
        })
    }



    if (!stations || !stations.length) {
        return <p>Loading stations...</p>
    }
    return (
        <div className="homepage-container">
            <h1>*Here I will add some stations that were recently played by the user*</h1>

            <section className="homepage-genre-section">
                <h2>Funk Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Funk')}
                </div>
            </section>

            <section className="homepage-genre-section">
                <h2>EDM Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Electronic')}
                </div>
            </section>

            <section className="homepage-genre-section">
                <h2>Hip-Hop and Rap Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Hip-Hop')}
                </div>
            </section>

            <section className="homepage-genre-section">
                <h2>Rock Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('Rock')}
                </div>
            </section>

            <section className="homepage-genre-section">
                <h2>R&B and Soul Stations</h2>
                <div className="home-stations-by-genre-container">
                    {postByGenre('R&B')}
                </div>
            </section>
        </div >
    )
}