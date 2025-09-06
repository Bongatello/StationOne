import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SongList } from '../cmps/SongList.jsx'
import { StationSongQuery } from '../cmps/StationSongQuery.jsx'
import { loadUser, addLikedStation, removeLikedStation } from '../store/user.actions.js'
import { getStationById, getStations } from '../store/station.actions.js'
import { togglePlayerState, getPlayingSong, setPlayingSong } from '../store/player.actions'

export function StationPreview() {

	const playerData = useSelector(state => state.playerModule.player)
	const userData = useSelector(state => state.userModule.user)
	const station = useSelector(state => state.stationModule.selectedStation)
	const params = useParams()

	//icons
	const pauseButton = <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z" />
	const playButton = <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" />
	const addToLibrary = <svg height="32px" width="32px" viewBox="0 0 24 24" className='add-to-library'><path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11" /><path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1" /></svg>
	const removeFromLibrary = <svg height="29.35px" width="29.35px" viewBox="0 0 24 24" className='remove-from-library'><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m16.398-2.38a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308z" /></svg>


	useEffect(() => {
		loadUser('68bb2208d5ea1ed6ddb82b4a')
		getStationById(params.stationId)
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

	function getStationDuration(){
		const stationDuration = 0


	}

	function isLikedByUser(targetID) { //probably needs to be edited due to mongoDB and userRedux changes
		const likedByUser = userData
		if (!likedByUser.likedStations.some(userStation => userStation._id === targetID)) return addToLibrary
		return removeFromLibrary
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
						<p>• {station.songs.length} songs</p>
					</div>

				</div>
			</div>


			{station.songs.length > 0 && // if station includes songs, the user will see the actions and the song list, else will see the next option
				<div className="station-actions-songs-wrapper">
					<div className="station-actions">
						<div className="play-pause-button-wrapper action-wrapper" onClick={() => togglePlayerState(!playerData.isPlaying)}>
							<svg height="24px" width="24px" viewBox="0 0 24 24" className='play-pause-button'>
								{playerData.isPlaying ? pauseButton : playButton}
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
							<p className="song-added">Date Added</p>
							<p className="song-length">Duration</p>
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
							<svg height="32px" width="32px" viewBox="0 0 24 24" className='invite-collaborators'><path d="M4.99 3h2.993v2H4.99v3H2.994V5H0V3h2.994V0h1.995zm7.288-.533a5.49 5.49 0 0 1 6.275 1.322 5.5 5.5 0 0 1 1.133 1.953c.18.532.33 1.474.277 2.378-.098 1.659-.8 3.02-1.749 4.156l-.432.52a.5.5 0 0 0 .134.752l3.59 2.077A5 5 0 0 1 24 19.955V22H4.99v-2.045a5 5 0 0 1 2.494-4.33l3.59-2.077a.5.5 0 0 0 .133-.753l-.43-.518-.002-.001c-.949-1.135-1.65-2.497-1.749-4.156-.053-.904.097-1.846.277-2.378a5.5 5.5 0 0 1 1.133-1.953 5.5 5.5 0 0 1 1.842-1.322M14.494 4a3.5 3.5 0 0 0-2.586 1.14 3.5 3.5 0 0 0-.715 1.245c-.092.272-.213.954-.174 1.617.066 1.124.536 2.092 1.287 2.99l.001.002.433.52a2.503 2.503 0 0 1-.669 3.767l-3.589 2.076a3 3 0 0 0-1.497 2.598V20h15.02v-.045a3 3 0 0 0-1.498-2.598l-3.589-2.076a2.503 2.503 0 0 1-.669-3.766l.433-.52.002-.003c.75-.898 1.22-1.866 1.287-2.99.039-.663-.082-1.345-.174-1.617-.163-.48-.4-.9-.715-1.245A3.5 3.5 0 0 0 14.494 4" />
							</svg>
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