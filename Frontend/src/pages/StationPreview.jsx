import React, { useState, useEffect } from 'react'
import { SongList } from '../cmps/SongList.jsx'
import { stationService } from "../services/station/station.service.js"
import { useParams } from 'react-router-dom'


export function StationPreview() {
	const [station, setStation] = useState(null)
	const params = useParams()

	useEffect(()=> {
	
	    loadStation()
	
	}, [])
	
	function loadStation() {
		console.log(params.stationId)
	    stationService.get(params.stationId)
	        .then(station => {
				console.log(station)
				setStation(station)})
			.then(console.log(station))
	        .catch(err =>{
	            console.log('err:', err)
	        })
	}

	const stopButton = <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z"/>
	const playButton = <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"/>

	const addToLibrary = <svg height="32px" width="32px" viewBox="0 0 24 24" className='add-to-library'><path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11"/><path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1"/></svg>
	const removeFromLibrary = <svg height="29.35px" width="29.35px" viewBox="0 0 24 24" className='remove-from-library'><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m16.398-2.38a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308z"/></svg>



	function isPlayPause () {
		if (playerService.isPlaying === true) return {stopButton}
		return {playButton}
	}



	if (!station) {
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
						<p style={{color:'white', fontWeight:'bold'}}>StationOne</p>
						<p>• {station.songs.length} songs</p>
					</div>

				</div>
			</div>


			<div className="station-actions-songs-wrapper">
				<div className="station-actions">
					<div className="play-pause-button-wrapper">
						<svg height="24px" width="24px" viewBox="0 0 24 24" className='play-pause-button'>
							{playButton}
						</svg>
					</div>

					<div className="add-remove-library-wrapper">
						{addToLibrary}
					</div>

					<div className="extra-options-wrapper">
						<svg height="32px" width="32px" viewBox="0 0 24 24" className='extra-options'>
							<path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
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
		</div>
	)
}