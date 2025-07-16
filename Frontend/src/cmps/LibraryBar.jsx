import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
//import { StationList } from './StationList.jsx'

export function LibraryBar() {
    return (
        <div className="library-bar">
            <h1>Your Library</h1>
            <button className="create">+ Create</button>
        </div>
    )
}