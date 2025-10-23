//react and libraries
import { useState, useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ColorThief from 'colorthief'
//cmps
import { SongList } from '../cmps/MainContentCmps/SongList.jsx'
import { StationSongQuery } from '../cmps/MainContentCmps/StationSongQuery.jsx'
import SvgIcon from '../cmps/SvgIcon.jsx'
//service-functions/actions
import { addLikedStation, loadUser, removeLikedStation } from '../store/user.actions.js'
import { setSelectedStation } from '../store/station.actions.js'
import { togglePlayerState, setPlayingSong, setPlayerStation, setIsHost } from '../store/player.actions'
import { formatStationDuration, makeId, getCapitalizedWord } from '../services/util.service.js'
import { songsService } from '../services/songs/songs.service.js'
import { eventBus } from '../services/event-bus.service.js'
import { AutoResizeTitle } from '../cmps/AutoResizeTitle.jsx'

export function StationPreview() {
	const playerData = useSelector(state => state.playerModule)
	const userData = useSelector(state => state.userModule.user)
	const station = useSelector(state => state.stationModule.selectedStation)
	const [stationDuration, setStationDuration] = useState('')
	const [isQuerySongs, setIsQuerySongs] = useState(false)
	const [querySongs, setQuerySongs] = useState([])
	const [color, setColor] = useState(null)
	const params = useParams()
	const location = useLocation()
	const route = location.pathname.split("/")[2]
	const imgRef = useRef(null)

	useEffect(() => {
		setStationDuration(getStationDuration())
		if (route === 'station') setSelectedStation(params.stationId, 'station')
		if (route === 'playlist') setSelectedStation(params.playlistId, 'playlist')
		if (route === 'album') setSelectedStation(params.albumId, 'album')
		colorThiefCover()
		console.log('Updated song list')
	}, [station.songs?.length])

	useEffect(() => {
		delete station.name //if params was changed (useEffect dependency), delete station name so station wouldn't be shown (check the if statement above the return of the component)
		setIsQuerySongs(false)
		setQuerySongs([])
		setStationDuration(getStationDuration())
		if (route === 'station') setSelectedStation(params.stationId, 'station')
		if (route === 'playlist') setSelectedStation(params.playlistId, 'playlist')
		if (route === 'album') setSelectedStation(params.albumId, 'album')
		colorThiefCover()
		console.log('New selected station: ', station)
	}, [params])

	function updateIsQuerySongs() {
		setIsQuerySongs(prev => !prev)
	}

	function updateQuerySongs(queriedSongs) {
		setQuerySongs(queriedSongs)
	}

	async function addRemoveFromList() {
		const likedStations = userData.likedStations
		const index = likedStations.findIndex(likedStation => likedStation._id === station._id ? true : likedStation._id === station.spotifyApiId)
		if (index === -1) { //if findIndex didnt find anything
			await addLikedStation(userData, station, route)
			console.log('added ', route, ' to liked list')
		}
		else {
			await removeLikedStation(userData, station)
			console.log('removed', route, 'from liked list')
		}
	}

	function getStationDuration() {
		var totalDuration = 0
		station.songs?.forEach(song => {
			totalDuration += song.durationMs
		})
		const formattedDuration = formatStationDuration(totalDuration)
		return formattedDuration
	}

	function isLikedByUser(station) {
		const likedByUser = userData
		if (!likedByUser.likedStations?.some(userStation => userStation._id === station._id ? true : userStation._id === station.spotifyApiId)) return <SvgIcon iconName={"addToLibrary"} className={"add-to-library"} />
		return <SvgIcon iconName={"removeFromLibrary"} className={"remove-from-library"} />
	}

	function isLikedByUserMobile(targetID) { //possible to merge into isLikedByUser and check if width of media is under/over 768px
		const likedByUser = userData
		if (!likedByUser.likedStations?.some(userStation => userStation._id === targetID)) return <SvgIcon iconName={"emptyHeart"} className={"add-to-library"} />
		return <SvgIcon iconName={"fullHeart"} className={"remove-from-library"} />
	}

	function colorThiefCover() {
		if (station.thumbnail) {
			if (imgRef.current && imgRef.current.complete) {
				const colorThief = new ColorThief()
				setColor(colorThief.getColor(imgRef.current))
			}
		}
		else setColor([85, 85, 85])
	}

	function playPauseLogic() {
		if ((route === 'station' && playerData.station?._id === station._id) || (!(route === 'station') && playerData.station?.spotifyApiId === station.spotifyApiId)) {
			togglePlayerState(!playerData.player.isPlaying)
		}
		else {
			setPlayingSong(station.songs[0])
			setPlayerStation(route, params.stationId || params.playlistId || params.albumId, userData)
			songsService.findOnYoutube(station.songs[0])
			togglePlayerState(true)
		}
	}

	function handleOpenEditModal() {
		if (!(userData.name === station.addedBy)) return console.log('insufficient permissions')
		eventBus.emit('show-modal', { type: 'station-edit', content: 'station-edit' })
	}

	if (!station.name) {
		if (route === "station") return params.stationId === station._id ? '' : <p></p>
		if (route === "playlist") return params.playlistId === station._id ? '' : <p></p>
		if (route === "album") return params.albumId === station._id ? '' : <p></p>
	}

	return (
		<div className="station-page-container"
			style={{
				background: `linear-gradient(
			to bottom,
			rgb(${color?.join(",")}) 0%,
			#121212 41%
		)`}}>
			{/* ---Desktop Station Details--- */}
			<div className="station-cover-details-wrapper">

				<div className="station-cover">
					{station.thumbnail &&
						<img ref={imgRef} src={station.thumbnail} crossOrigin="anonymous" onLoad={() => {
							const colorThief = new ColorThief()
							setColor(colorThief.getColor(imgRef.current))
						}} />
					}
					{!station.thumbnail &&
						<div className='default-cover'>
							<SvgIcon iconName={"stationDefaultCover"} className={"default-cover-svg"} />
						</div>
					}
				</div>


				<div className="station-details-container" >
					{!(route === "album") && <p>Public Playlist</p>}
					{route === "album" && <p>{getCapitalizedWord(station.albumType)}</p>}
					<AutoResizeTitle onClick={() => handleOpenEditModal()}>
						{station.name}
					</AutoResizeTitle>

					<div className="station-details">
						<p style={{ color: 'white', fontWeight: 'bold' }}>{station.addedBy ? station.addedBy : station.artists}</p>
						{station.songs.length > 0 &&
							<div className='songs-length-wrapper'>
								<p>• {station.songs.length} {station.songs.length > 1 ? 'songs' : 'song'}, </p>
								<p>{stationDuration}</p>
							</div>
						}
					</div>

				</div>
			</div>
			{/* ---Mobile Station Details--- */}
			<div className="station-cover-details-wrapper-mobile">

				<div className="station-cover">
					{station.thumbnail &&
						<img ref={imgRef} src={station.thumbnail} crossOrigin="anonymous" onLoad={() => {
							const colorThief = new ColorThief()
							setColor(colorThief.getColor(imgRef.current))
						}} />
					}
					{!station.thumbnail &&
						<div className='default-cover'>
							<SvgIcon iconName={"stationDefaultCover"} className={"default-cover-svg"} />
						</div>
					}
				</div>


				<div className="station-details-container" >
					<AutoResizeTitle onClick={() => handleOpenEditModal()}>
						{station.name}
					</AutoResizeTitle>
					<p style={{ color: 'white', fontWeight: 'bold' }}>{station.addedBy ? station.addedBy : station.artists}</p>

					{station.songs.length > 0 &&
						<div className='songs-length-wrapper'>
							<p>{stationDuration}</p>
						</div>
					}

				</div>
			</div>

			<div className='under-details-wrapper'>
				{station.songs.length > 0 && // if station includes songs, the user will see the actions and the song list, else will see the next option
					<div className="station-actions-songs-wrapper">
						{/* ---Desktop Station Actions--- */}
						<div className="station-actions">
							<div className="play-pause-button-wrapper action-wrapper" onClick={() => playPauseLogic()}>
								{playerData.player.isPlaying && ((route === 'station' && playerData.station?._id === station._id) || (!(route === 'station') && playerData.station?.spotifyApiId === station.spotifyApiId)) ? <SvgIcon iconName={"pauseButton"} /> : <SvgIcon iconName={"playButton"} />}
							</div>

							<div className="add-remove-library-wrapper action-wrapper" onClick={() => addRemoveFromList()}>
								{isLikedByUser(station)}
							</div>

							{station.addedBy === userData.name && //very dangerous, will change it to station._id === userData._id later on, since having 2 users with same name could cause collision!!
								<div className='invite-collaborators-wrapper action-wrapper'>
									<SvgIcon iconName={"inviteCollaborators"} className={"invite-collaborators"} />
								</div>
							}

							<div className="extra-options-wrapper action-wrapper">
								<SvgIcon iconName={"extraOptions"} />
							</div>
							
						</div>

						{/* ---Mobile Station Actions--- */}

						<div className='station-actions-mobile'>
							<div className="play-pause-button-wrapper action-wrapper" onClick={() => playPauseLogic()}>
								{playerData.player.isPlaying && (playerData.station?._id === station._id) ? <SvgIcon iconName={"pauseButton"} /> : <SvgIcon iconName={"playButton"} />}
							</div>

							<div className="add-remove-library-wrapper action-wrapper" onClick={() => addRemoveFromList()}>
								{isLikedByUserMobile(station._id)}
							</div>

							<div className="share-button">
								<SvgIcon iconName={'shareButton'} /* className={'share-button'} */ />
							</div>

							<div className="extra-options-wrapper action-wrapper">
								<SvgIcon iconName={"extraOptionsMobile"} />
							</div>
						</div>

						<div className="station-songs-container">
							<div className="song-preview-headlines">
								<p className="song-index">#</p>
								<p className="song-title">Title</p>
								<p className='song-album'>Album</p>
								<p className="song-added">Date Added</p>
								<p className="song-length"><SvgIcon iconName={"durationSvg"} /></p>
							</div>

							<div className="station-songs">
								{station.songs?.map((song, index) =>
									<ul key={song.id}>
										<SongList song={song} index={index} />
									</ul>
								)}
							</div>

							{/* {route === "album" && <div className='album-credits'>{station.copyrights}</div>} */}
						</div>
					</div>
				}

				{station.songs.length < 1 &&
					<div className="station-actions-songs-wrapper">
						<div className="station-actions">
							<div className='invite-collaborators-wrapper action-wrapper'>
								<SvgIcon iconName={"inviteCollaborators"} className={"invite-collaborators"} />
							</div>
							<div className="extra-options-wrapper action-wrapper" onClick={() => eventBus.emit('show-modal', { type: 'more-options', content: 'more-options' })}>
								<SvgIcon iconName={"extraOptions"} />
							</div>
						</div>
					</div>
				}
				{station.addedBy === userData.name &&
					<StationSongQuery isQuerySongs={isQuerySongs} updateIsQuerySongs={updateIsQuerySongs} querySongs={querySongs} updateQuerySongs={updateQuerySongs} />
				}
			</div>
		</div>
	)
}