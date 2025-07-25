import { Link, NavLink } from 'react-router-dom'


export function StationsLibraryList({station}){



    return (
        <Link to={`/StationOne/station/${station._id}`}>
                <div className='library-station-object'>
                    <img src={station.thumbnail}/>
                    <div className='library-station-details'>
                        <h1>{station.name}</h1>
                        <p>Station • {station.addedBy}</p>
                    </div>
                </div>
        </Link>
    )
}

//${station._id}

//<img src={station.thumbnail}/>