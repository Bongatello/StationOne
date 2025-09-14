import { Link } from 'react-router-dom'

export function StationsHomeList({ station, genre }) {
    return (
        <Link to={`/StationOne/playlist/${station.spotifyApiId}`}>
            <div className='home-station-object'>
                <div className='home-station-image'>
                    <img src={station.thumbnail} />
                </div>
                <p>{station.desc}</p>
            </div>
        </Link>
    )
}