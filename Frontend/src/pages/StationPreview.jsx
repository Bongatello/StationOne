//react
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import { findOnYoutube } from '../services/songs/songs.service.js'

export function StationPreview() {
	const playerData = useSelector(state => state.playerModule)
	const userData = useSelector(state => state.userModule.user)
	const station = useSelector(state => state.stationModule.selectedStation)
	const [stationDuration, setStationDuration] = useState('')
	const params = useParams()

	//icons
	const pauseButton = <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z" />
	const playButton = <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" />
	const addToLibrary = <svg height="32px" width="32px" viewBox="0 0 24 24" className='add-to-library'><path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11" /><path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1" /></svg>
	const removeFromLibrary = <svg height="29.35px" width="29.35px" viewBox="0 0 24 24" className='remove-from-library'><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m16.398-2.38a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308z" /></svg>
	const durationSvg = <svg height="16px" width="16px" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25" /></svg>

	useEffect(() => {
		loadUser('68bb2208d5ea1ed6ddb82b4a')
		setStationDuration(getStationDuration())
		setSelectedStation(params.stationId)
	}, [params, station.songs.length])



	function addRemoveFromList() {
		const likedStations = userData //probably needs to be edited due to mongoDB and userRedux changes
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
		if (!likedByUser.likedStations.some(userStation => userStation._id === targetID)) return addToLibrary
		return removeFromLibrary
	}

	function playPauseLogic() {
		if (!(station._id === playerData.station._id)) {
			setPlayingSong(station.songs[0])
			setPlayerStation(params.stationId)
			findOnYoutube(station.songs[0])
			togglePlayerState(true)
		}
		else {
			togglePlayerState(!playerData.player.isPlaying)
		}
	}


	if (!station.name) {
		return <p>Loading station...</p>
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
						<img src="../../img/StationOneLogo.png" className="createdby-img" />
						<p style={{ color: 'white', fontWeight: 'bold' }}>{station.addedBy}</p>
						<p>• {station.songs.length} songs, </p>
						<p>{stationDuration}</p>
					</div>

				</div>
			</div>


			{station.songs.length > 0 && // if station includes songs, the user will see the actions and the song list, else will see the next option
				<div className="station-actions-songs-wrapper">
					<div className="station-actions">
						<div className="play-pause-button-wrapper action-wrapper" onClick={playPauseLogic}>
							<svg height="24px" width="24px" viewBox="0 0 24 24" className='play-pause-button'>
								{playerData.player.isPlaying && (playerData.station._id === station._id) ? pauseButton : playButton}
							</svg>
						</div>

						<div className="add-remove-library-wrapper action-wrapper" onClick={addRemoveFromList}>
							{isLikedByUser(station._id)}
						</div>

						<div className="extra-options-wrapper action-wrapper">
							<svg height="32px" width="32px" viewBox="0 0 24 24" className='extra-options'>
								<path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
							</svg>
						</div>
					</div>

					<div className="station-songs-container">

						<div className="song-preview-headlines">
							<p className="song-index">#</p>
							<p className="song-title">Title</p>
							<p className='song-album'>Album</p>
							<p className="song-added">Date Added</p>
							<p className="song-length"><SvgIcon iconName={"durationSvg"}/></p>
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
							<SvgIcon iconName={"inviteCollaborators"}/>
						</div>
						<div className="extra-options-wrapper action-wrapper">
							<svg height="32px" width="32px" viewBox="0 0 24 24" className='extra-options'>
								<path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
							</svg>
						</div>
					</div>
				</div>
			}
			<StationSongQuery />
		</div>
	)
}