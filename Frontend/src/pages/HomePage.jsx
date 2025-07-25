import { Link } from "react-router-dom";
import { stationService } from "../services/station/station.service.js"
import { useEffect, useState } from "react";
import { StationsHomeList } from "../cmps/StationsHomeList.jsx"
import { loadFromStorage } from "../services/util.service.js";


export function HomePage() {

    const [stations, setStations] = useState(null)

    useEffect(() => {
        const stations = stationService.loadStations()
        setStations(stations)
    }, [])

    function postByGenre(genre){
        return stations.map(station => {
            if(station.tags.includes(genre)){
                console.log('found station with', genre, ' genre, station name: ', station.name)
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
    console.log('loaded stations', stations)
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