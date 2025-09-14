//react
import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
//cmps
import { SongList } from '../cmps/SongList.jsx'
import { StationSongQuery } from '../cmps/StationSongQuery.jsx'
import SvgIcon from '../cmps/SvgIcon.jsx'
//service-functions/actions
import { loadUser, addLikedStation, removeLikedStation } from '../store/user.actions.js'
import { setSelectedStation, getStations } from '../store/station.actions.js'
import { togglePlayerState, getPlayingSong, setPlayingSong, setPlayerStation } from '../store/player.actions'
import { formatStationDuration } from '../services/util.service.js'
import { songsService } from '../services/songs/songs.service.js'


export function StationPreview() {
	const playerData = useSelector(state => state.playerModule)
	const userData = useSelector(state => state.userModule.user)
	const station = useSelector(state => state.stationModule.selectedStation)
	const spotifyStations = useSelector(state => state.stationModule.spotifyStations) 
	const [stationDuration, setStationDuration] = useState('')
	const [isQuerySongs, setIsQuerySongs] = useState(false)
	const [querySongs, setQuerySongs] = useState([])
	const params = useParams()
	const location = useLocation()
	const route = location.pathname.split("/")[2]

	useEffect(() => {
		loadUser('68bb2208d5ea1ed6ddb82b4a')
		setStationDuration(getStationDuration())
		console.log(route)
		if (route === 'station') setSelectedStation(params.stationId)
		if (route === 'playlist') setSelectedStation(params.playlistId)
		setIsQuerySongs(false)
		setQuerySongs([])
	}, [params, station.songs.length])

	function updateIsQuerySongs() {
		setIsQuerySongs(prev => !prev)
	}

	function updateQuerySongs(queriedSongs) {
		setQuerySongs(queriedSongs)
	}

	function addRemoveFromList() {
		const likedStations = userData.likedStations //probably needs to be edited due to mongoDB and userRedux changes
		const index = likedStations.likedStations.findIndex(likedStation => likedStation._id === station._id)
		if (index === -1) {
			//addLikedStation(station) //probably needs to be edited due to mongoDB and userRedux changes
			console.log('added station ', station._id, ' to liked list')
		}
		else {
			//removeLikedStation(station) //probably needs to be edited due to mongoDB and userRedux changes
			console.log('removed station ', station._id, ' from liked list')
		}
	}

	function getStationDuration() {
		var totalDuration = 0
		station.songs.forEach(song => {
			totalDuration += song.durationMs
		})
		const formattedDuration = formatStationDuration(totalDuration)
		return formattedDuration
	}

	function isLikedByUser(targetID) { //probably needs to be edited due to mongoDB and userRedux changes
		const likedByUser = userData
		if (!likedByUser.likedStations.some(userStation => userStation._id === targetID)) return <SvgIcon iconName={"addToLibrary"} />
		return <SvgIcon iconName={"removeFromLibrary"} />
	}

	function playPauseLogic() {
		if (!(station._id === playerData.station._id)) {
			setPlayingSong(station.songs[0])
			setPlayerStation(params.stationId)
			songsService.findOnYoutube(station.songs[0])
			togglePlayerState(true)
		}
		else {
			togglePlayerState(!playerData.player.isPlaying)
		}
	}

/* 	if (route === 'playlist') {
		if (!station) {
			const idx = spotifyStations.
		}
	} */

	if (route === 'station') {
		if (!station.name) {
		return <p>Loading station...</p>
	}
	}
	return (
		<div className="station-page-container">
			<div className="station-cover-details-wrapper">

				<div className="station-cover">
					<img src={station.thumbnail} />
				</div>


				<div className="station-details-container">
					<p>Public Station</p>
					<h1>{station.name}</h1>

					<div className="station-details">
						<img src={(station.addedBy === "StationOne") ? "/StationOne/img/sologo.png" : userData.image} className="createdby-img" />
						<p style={{ color: 'white', fontWeight: 'bold' }}>{station.addedBy}</p>
						<p>• {station.songs.length} {station.songs.length>1 ? 'songs' : 'song'}, </p>
						<p>{stationDuration}</p>
					</div>

				</div>
			</div>


			{station.songs.length > 0 && // if station includes songs, the user will see the actions and the song list, else will see the next option
				<div className="station-actions-songs-wrapper">
					<div className="station-actions">
						<div className="play-pause-button-wrapper action-wrapper" onClick={playPauseLogic}>
							{playerData.player.isPlaying && (playerData.station._id === station._id) ? <SvgIcon iconName={"pauseButton"}/> : <SvgIcon iconName={"playButton"}/>}
						</div>

						<div className="add-remove-library-wrapper action-wrapper" onClick={addRemoveFromList}>
							{isLikedByUser(station._id)}
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

					<div className="station-songs-container">

						<div className="song-preview-headlines">
							<p className="song-index">#</p>
							<p className="song-title">Title</p>
							<p className='song-album'>Album</p>
							<p className="song-added">Date Added</p>
							<p className="song-length"><SvgIcon iconName={"durationSvg"} /></p>
						</div>
						<div className="station-songs">
							{station.songs.map((song, index) =>
								<ul key={song.id}>
									<SongList song={song} index={index} />
								</ul>
							)}
						</div>

					</div>
				</div>
			}

			{station.songs.length < 1 &&
				<div className="station-actions-songs-wrapper">
					<div className="station-actions">
						<div className='invite-collaborators-wrapper action-wrapper'>
							<SvgIcon iconName={"inviteCollaborators"} className={"invite-collaborators"} />
						</div>
						<div className="extra-options-wrapper action-wrapper">
							<SvgIcon iconName={"extraOptions"} />
						</div>
					</div>
				</div>
			}
			<StationSongQuery isQuerySongs={isQuerySongs} updateIsQuerySongs={updateIsQuerySongs} querySongs={querySongs} updateQuerySongs={updateQuerySongs} />
		</div>
	)
}