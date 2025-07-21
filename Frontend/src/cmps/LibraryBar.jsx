import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
//import { StationList } from './StationList.jsx'

export function LibraryBar() {

    const newStation = {
        id:'firstid',
        name: "New Playlist",
        img: "some link",
        tags: ['Funk', 'Happy'],
	    createdBy: {
		    _id: 'u101',
		    fullname: 'Puki Ben David',
		    imgUrl: 'http://some-photo/',
	    },
	    likedByUsers: ['{minimal-user}', '{minimal-user}'],
	    songs: [
		    {
			    id: 's1001',
			    title: 'The Meters - Cissy Strut',
			    url: 'youtube/song.mp4',
			    imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
			    addedBy: '{minimal-user}',
			    likedBy: ['{minimal-user}'],
			    addedAt: 162521765262,
		    },
		    {
			    id: 'mUkfiLjooxs',
			    title: "The JB's - Pass The Peas",
			    url: 'youtube/song.mp4',
			    imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
			    addedBy: {},
		    },
        ]


        }

    return (
        <div className="library-bar">
            <h1>Your Library</h1>
            <button className="create">+ Create</button>
            <NavLink to="/StationOne/Test" className="test-station">
                <img src="https://cdn.pixabay.com/photo/2016/03/23/17/26/music-note-1275177_960_720.png"/>
                <p>Test Station</p>
            </NavLink>
            <NavLink to='/StationOne/${newStation.id}' className="test-station">
                <img src={newStation.img}/>
                <p>{newStation.name}</p>
            </NavLink>


        </div>
    )
}