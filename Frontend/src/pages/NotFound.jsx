import { NavLink } from 'react-router-dom'

export function NotFound(){

    return(
        <div className="not-found-page">
            <h1>ERROR 404!</h1>
            <p>unfortunately, the page you were looking for, was not found D:</p>
            <div className="not-found-back"><NavLink to="/StationOne/" className="not-found-back">Home</NavLink></div>
        </div>
    )

}