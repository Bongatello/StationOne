import { Link } from 'react-router-dom'

export function StationsHomeList({ station, genre }) {
    return (
        <Link to={`/StationOne/station/${station._id}`}>
            <div className='home-station-object'>
                <div className='home-station-image'>
                    <img src={station.image} />
                </div>
                <p>{station.desc}</p>
            </div>
        </Link>
    )
}