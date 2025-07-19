import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
//import { StationList } from './StationList.jsx'

export function LibraryBar() {
    return (
        <div className="library-bar">
            <h1>Your Library</h1>
            <button className="create">+ Create</button>
            <NavLink to="/StationOne/Test" className="test-station">
                <img src="https://cdn.pixabay.com/photo/2016/03/23/17/26/music-note-1275177_960_720.png"/>
                <p>Test Station</p>
            </NavLink>


        </div>
    )
}