import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { setPlayerStation, setPlayingSong, togglePlayerState } from '../store/player.actions'
import { findOnYoutube } from '../services/songs/songs.service'
import { stationService } from '../services/station/station.service'

export function StationsLibraryList({ station }) {
    const playerData = useSelector(state => state.playerModule)

    const pauseButton = <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z" />
    const playButton = <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" />

    async function playPauseLogic() {
        try {
            if (!(station._id === playerData.station._id)) {
            setPlayerStation(station._id)
            const tempStation = await stationService.get(station._id)
            setPlayingSong(tempStation.songs[0])
            findOnYoutube(tempStation.songs[0])
            togglePlayerState(true)
        }
        else {
            togglePlayerState(!playerData.isPlaying)
        }
        } catch(err) {
            console.log('StationsLibraryList(cmp): There was an error playing/pausing station, ', err)
            throw err
        }
    }

    return (
        <Link to={`/StationOne/station/${station._id}`}>
            <div className='library-station-object'>
                <div className='svg-thumbnail'>
                    {
                        <svg width='24px' height='24px' viewBox="0 0 24 24" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            playPauseLogic()
                        }}>
                            {(!playerData.player.isPlaying || !(station._id === playerData.station._id)) && playButton} {/* song is not playing OR song is not selected, show play button */}
                            {playerData.player.isPlaying && station._id === playerData.station._id && pauseButton} {/* song is playing AND song is selected, show pause button */}
                        </svg>
                    }
                    <img src={station.thumbnail} />
                </div>
                <div className='library-station-details'>
                    <h1>{station.name}</h1>
                    <p>Station • {station.addedBy}</p>
                </div>
            </div>
        </Link>
    )
}

//${station._id}

//<img src={station.thumbnail}/>