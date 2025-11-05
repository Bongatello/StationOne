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
	const [activeFilter, setActiveFilter] = useState(null) // null, 'playlist', or 'album'
	const [secondaryFilter, setSecondaryFilter] = useState(null) // null, 'byYou', or 'bySpotify'
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

	function handleFilterClick(filterType) {
		// Toggle filter: if clicking the same filter, reset to show all
		if (activeFilter === filterType) {
			setActiveFilter(null)
			setSecondaryFilter(null) // Reset secondary filter when primary is cleared
		} else {
			setActiveFilter(filterType)
			setSecondaryFilter(null) // Reset secondary filter when changing primary filter
		}
	}

	function handleSecondaryFilterClick(filterType) {
		// Toggle secondary filter
		if (secondaryFilter === filterType) {
			setSecondaryFilter(null)
		} else {
			setSecondaryFilter(filterType)
		}
	}

	function handleClearFilters() {
		setActiveFilter(null)
		setSecondaryFilter(null)
	}

	function getFilteredStations() {
		let filtered = userData.likedStations || []
		
		// Apply primary filter
		if (activeFilter) {
			filtered = filtered.filter(station => station.route === activeFilter)
		}
		
		// Apply secondary filter (only for playlists)
		if (activeFilter === 'playlist' && secondaryFilter) {
			if (secondaryFilter === 'byYou') {
				filtered = filtered.filter(station => station.addedBy === userData.name)
			} else if (secondaryFilter === 'bySpotify') {
				filtered = filtered.filter(station => station.addedBy !== userData.name)
			}
		}
		
		return filtered
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
					{/* X button - only visible when a filter is active */}
					<button 
						className='filter-clear'
						onClick={handleClearFilters}
						style={{ display: activeFilter ? 'block' : 'none' }}
					>×</button>
					{/* Primary filter buttons */}
					<button 
						onClick={() => handleFilterClick('playlist')}
						className={activeFilter === 'playlist' ? 'active' : ''}
						style={{ display: activeFilter && activeFilter !== 'playlist' ? 'none' : 'block' }}
					>Playlists</button>
					<button 
						style={{ display: activeFilter ? 'none' : 'block' }}
					>Artists</button>
					<button 
						onClick={() => handleFilterClick('album')}
						className={activeFilter === 'album' ? 'active' : ''}
						style={{ display: activeFilter && activeFilter !== 'album' ? 'none' : 'block' }}
					>Albums</button>
					<button 
						className='not-used'
						style={{ display: activeFilter ? 'none' : 'block' }}
					>Podcasts & Shows</button>
					{/* Secondary filter buttons - only visible when playlist is active */}
					{activeFilter === 'playlist' && (
						<>
							<button 
								onClick={() => handleSecondaryFilterClick('byYou')}
								className={secondaryFilter === 'byYou' ? 'active' : ''}
							>By you</button>
							<button 
								onClick={() => handleSecondaryFilterClick('bySpotify')}
								className={secondaryFilter === 'bySpotify' ? 'active' : ''}
							>By spotify</button>
						</>
					)}
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
							<div>
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
			{getFilteredStations().map(station => <StationsLibraryList key={station._id || station.spotifyApiId} station={station} userData={userData} playerData={playerData} />)}


		</div>
	)
}
