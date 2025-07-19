import React, { useState, useEffect } from 'react'
import { SongList } from '../cmps/SongList.jsx'

var station = {
	_id: '5cksxjas89xjsa8xjsa8jxs09',
	name: 'Funky Monks',
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
	],
	msgs: [
		{
			id: 'm101',
			from: '{mini-user}',
			txt: 'Manish?',
		},
	],
}


export function StationPreview() {
	//    const [station, setStation] = useState(null)
	//    
	//    useEffect(()=> {
	//
	//        loadStation()
	//
	//    }, [])
	//
	//    function loadStation() {
	//        stationService.get(testStation)
	//            .then(setStation)
	//            .catch(err =>{
	//                console.log('err:', err)
	//            })
	//    }



	return (
		<div className="station-page-container">
			<div className="station-details-container">

				<div className="station-cover">
					<img src="https://cdn.pixabay.com/photo/2016/03/23/17/26/music-note-1275177_960_720.png" />
				</div>


				<div className="station-details-container">
					<p>Public Station</p>
					<h1>{station.name}</h1>

					<div className="station-details">
						<img src="../../img/StationOneLogo.png" className="createdby-img" />
						<p>StationOne • </p>
						<p> {station.songs.length} songs</p>
					</div>

				</div>
			</div>


			<div className="station-actions-songs-wrapper">
				<div className="station-actions">
					<div className="play-button">
						<img src="https://cdn.pixabay.com/photo/2016/02/01/12/20/play-1173495_960_720.png" />
					</div>

					<div className="extra-options">
						<img src="https://cdn.pixabay.com/photo/2016/01/03/11/24/gear-1119298_960_720.png" />
					</div>
				</div>

				<div className="station-songs-container">

					<div className="song-preview-headlines">
            	    	<p className="song-index">#</p>
            	    	<p className="song-title">Title</p>
            	    	<p className="song-added">Date Added</p>
            	    	<p className="song-length">Length</p>
            		</div>

					<hr/>

					{station.songs.map((song, index) =>
						<ul key={song.id}>
							<SongList song={song} index={index} />
						</ul>
					)}

				</div>
			</div>
		</div>
	)
}