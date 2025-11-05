import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { StationsHomeList } from "../cmps/MainContentCmps/StationsHomeList.jsx"
import { useSelector } from 'react-redux'
import { getStations, getSpotifyStations } from "../store/station.actions.js"
import ColorThief from "colorthief"
import { loadUser } from "../store/user.actions.js"

export function HomePage() {
    const genres = ['Pop', 'Electronic', 'Hip-Hop', 'Techno', 'Hebrew']
    const stations = useSelector(state => state.stationModule.stations)
    const spotifyStations = useSelector(state => state.stationModule.spotifyStations)
    const user = useSelector(state => state.userModule.user)
    const [hoverColor, setHoverColor] = useState([85, 85, 85]);
    const firstImgRef = useRef(null);
    const animationRef = useRef(null);
    const startTimeRef = useRef(null);
    const fromColorRef = useRef(null);
    const toColorRef = useRef(null);
    const transitionDurationMs = 400;

    useEffect(() => {
        const storedUser = localStorage.getItem('userDB')
        const parsedUserId = JSON.parse(storedUser)

        if (parsedUserId?.userId) {
            loadUser(parsedUserId.userId) // Load user data if not already available
        }
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

    function transitionToColor(nextColor) {
        if (!Array.isArray(nextColor) || nextColor.length !== 3) return
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        fromColorRef.current = hoverColor
        toColorRef.current = nextColor
        startTimeRef.current = null
        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp
            const elapsed = timestamp - startTimeRef.current
            const t = Math.min(elapsed / transitionDurationMs, 1)
            const eased = t * (2 - t) // easeOutQuad
            const current = [0, 1, 2].map(i => {
                const from = fromColorRef.current[i]
                const to = toColorRef.current[i]
                return Math.round(from + (to - from) * eased)
            })
            setHoverColor(current)
            if (t < 1) {
                animationRef.current = requestAnimationFrame(animate)
            } else {
                animationRef.current = null
                startTimeRef.current = null
            }
        }
        animationRef.current = requestAnimationFrame(animate)
    }

    function handleMouseEnter(ev, thumbnail) {
        const img = ev.currentTarget.querySelector("img")
        if (thumbnail && img.complete) {
            const colorThief = new ColorThief()
            const color = colorThief.getColor(img)
            transitionToColor(color)
        }
    }

    function handleMouseLeave() {
        if (firstImgRef.current?.complete) {
            const colorThief = new ColorThief()
            const color = colorThief.getColor(firstImgRef.current)
            transitionToColor(color) // reset to first station color
        }
    }

    function postByGenre(genre) {
        const spotifyStationsToDisplay = spotifyStations[genre]
        return spotifyStationsToDisplay.map(station => {
            return (
                <div className="home-station-wrapper">
                    <StationsHomeList station={station} genre={genre} />
                </div>
            )
        })
    }



    if (!spotifyStations) {
        return <p>Loading stations...</p>
    }
    return (
        <div className="homepage-container" style={{
            background: `linear-gradient(
            to bottom,
            rgba(${hoverColor?.join(",")}, 0.4) 0%,
            #121212 14%
        )`
        }}>
            <section className="recent-stations-container">
                {
                    user.recentStations?.map((station, idx) =>
                        <Link to={`/StationOne/${station.route}/${station._id || station.spotifyApiId}`} className="recent-station" key={station._id}
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