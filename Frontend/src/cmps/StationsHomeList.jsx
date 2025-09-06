import { Link } from 'react-router-dom'

export function StationsHomeList({ station, genre }) {
    return (
        <Link to={`/StationOne/station/${station._id}`}>
            <div className='home-station-object'>
                <img src={station.thumbnail}/>
                <p>{station.name}</p>
            </div>
        </Link>
    )
}