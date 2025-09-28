import { Link } from 'react-router-dom'

export function StationsHomeList({ station, genre }) {
    return (
        <Link to={`/StationOne/playlist/${station.spotifyApiId}`}>
            <div className='home-station-object'>
                <div className='home-station-image'>
                    <img src={station.thumbnail} />
                    <div className="play-button"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log(station)
                        }}>
                        <svg height="24px" width="24px" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" /></svg>
                    </div>
                </div>
                <p>{station.desc}</p>
            </div>
        </Link>
    )
}