import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/user/user.service.js'
import { StationsLibraryList } from './StationsLibraryList.jsx'
import { loadUser } from '../../store/user.actions.js'
import SvgIcon from '../SvgIcon.jsx'
import { stationService } from '../../services/station/station.service.js'
import { Link, useLocation } from 'react-router-dom'


export function LibraryBar() {
	const userData = useSelector(state => state.userModule.user)
	const [isQueryByText, setIsQueryByText] = useState(false)
	const playerData = useSelector(state => state.playerModule)
	const location = useLocation()
	const route = location.pathname.split("/")[2]



	useEffect(() => {
		const storedUser = localStorage.getItem('userDB')
		const parsedUserId = JSON.parse(storedUser)

		if (parsedUserId?.userId) {
			loadUser(parsedUserId.userId) // Load user data if not already available
		}
	}, [userData.likedStations?.length])

	async function addNewUserStation() {
		await stationService.addStation(userData)
	}

	async function playPauseLogic() {
		try {
			if (!(station._id === playerData.station?._id)) {
				setPlayerStation(station._id, userData)
				const tempStation = await stationService.get(station._id)
				songsService.findOnYoutube(tempStation.songs[0])
				togglePlayerState(true)
			}
			else {
				togglePlayerState(!playerData.isPlaying)
			}
		} catch (err) {
			console.log('StationsLibraryList(cmp): There was an error playing/pausing station, ', err)
			throw err
		}
	}


	if (userData === undefined) {
		return (
			<div>Stations Loading...</div>
		)
	}
	return (
		<div className="library-bar">
			<div className="header-create-wrapper">
				<h1>Your Library</h1>
				<button className="create" onClick={() => addNewUserStation()}>
					<SvgIcon iconName={"plusCreateButtonSVG"} />

					<h1>Create</h1>
				</button>
			</div>
			<div className='sort-filter-library-content'>
				<div className='filter-by-cat'>
					<button>Playlists</button>
					<button>Artists</button>
					<button>Albums</button>
					<button className='not-used'>Podcasts & Shows</button>
				</div>
				<div className='sort-by'>
					<button className='text-query'><SvgIcon iconName={"stationSpotifyQuery"} /></button>
					{isQueryByText &&
						<input><SvgIcon iconName={"stationSpotifyQuery"} /></input>
					}
					<button className='sortby-method'>Recently Added <SvgIcon iconName={'libraryBarSort'} /></button>
				</div>
			</div>
			<Link to={`/StationOne/station/collection/tracks`}>
				<div className='library-station-object'>
					<div className='svg-thumbnail'>
						{
							<div onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								playPauseLogic()
							}}>
								<SvgIcon iconName={"libraryPauseButton"} /> {/* song is not playing OR song is not selected, show play button */}
							</div>
						}
						<img src="https://misc.scdn.co/liked-songs/liked-songs-64.png" />
					</div>
					<div className='library-station-details'>
						<h1 style={userData.likedSongs?._id === playerData.station?._id ? { color: '#FFF' } : { color: '#FFF' }}>Liked Songs</h1>
						<p>Station • {userData.likedSongs?.songs?.length ? '0 songs' : userData.likedSongs?.songs?.length > 1 ? userData.likedSongs?.songs?.length + ' songs' : userData.likedSongs?.songs?.length + ' song'}</p>
					</div>
				</div>
			</Link>
			{userData.likedStations?.map(station => <StationsLibraryList station={station} userData={userData} playerData={playerData} />)}


		</div>
	)
}
