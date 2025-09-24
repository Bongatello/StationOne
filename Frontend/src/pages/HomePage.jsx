import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { StationsHomeList } from "../cmps/MainContentCmps/StationsHomeList.jsx"
import { useSelector } from 'react-redux'
import { getStations, getSpotifyStations } from "../store/station.actions.js"
import ColorThief from "colorthief"

export function HomePage() {
    const genres = ['Pop', 'Electronic', 'Hip-Hop', 'Techno', 'Hebrew']
    const stations = useSelector(state => state.stationModule.stations)
    const spotifyStations = useSelector(state => state.stationModule.spotifyStations)
    const user = useSelector(state => state.userModule.user)
    const [hoverColor, setHoverColor] = useState([85, 85, 85]);
    const firstImgRef = useRef(null);

    useEffect(() => {

        getStations()
        if (!spotifyStations) getSpotifyStations(genres.join(','))

    }, [])

    useEffect(() => {
        if (user.recentStations?.length && firstImgRef.current?.complete) {
            const colorThief = new ColorThief()
            const color = colorThief.getColor(firstImgRef.current)
            setHoverColor(color)
        }
    }, [])

    function handleMouseEnter(ev, thumbnail) {
        const img = ev.currentTarget.querySelector("img")
        if (thumbnail && img.complete) {
            const colorThief = new ColorThief()
            const color = colorThief.getColor(img)
            setHoverColor(color)
        }
    }

    function handleMouseLeave() {
        if (firstImgRef.current?.complete) {
            const colorThief = new ColorThief()
            const color = colorThief.getColor(firstImgRef.current)
            setHoverColor(color) // reset to first station color
        }
    }

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
        <div className="homepage-container" style={{
            background: `linear-gradient(
			to bottom,
			rgba(${hoverColor?.join(",")}, 0.4) 0%,
            #121212 14%
		)`}}>
            <section className="recent-stations-container">
                {
                    user.recentStations?.map((station, idx) =>
                        <Link to={`/StationOne/station/${station._id}`} className="recent-station" key={station._id}
                            onMouseEnter={(ev) => handleMouseEnter(ev, station.thumbnail)}
                            onMouseLeave={handleMouseLeave}>
                            <div className="station-cover">
                                <img ref={idx === 0 ? firstImgRef : null}
                                    src={station.thumbnail}
                                    crossOrigin="anonymous"
                                    alt={station.name} /></div>
                            <p>{station.name}</p>
                        </Link>
                    )
                }
            </section>

            <div className="homepage-genre-container">
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


        </div>
    )
}