import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { setPlayerStation, setPlayingSong, togglePlayerState } from '../../store/player.actions'
import { songsService } from '../../services/songs/songs.service'
import { stationService } from '../../services/station/station.service'
import SvgIcon from '../SvgIcon'
import { useEffect } from 'react'

export function StationsLibraryList({ station, userData, playerData }) {
    /* const playerData = useSelector(state => state.playerModule) */

    useEffect(() => {

    }, [playerData.station._id])

    async function playPauseLogic() {
        try {
            if (!(station._id === playerData.station._id)) {
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

    return (
        <Link to={`/StationOne/station/${station._id}`}>

            <div className='library-station-object'>
                <div className='svg-thumbnail'>
                    {
                        <div onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            playPauseLogic()
                        }}>
                            {(!playerData.player.isPlaying || !(station._id === playerData.station._id)) && <SvgIcon iconName={"libraryPauseButton"} />} {/* song is not playing OR song is not selected, show play button */}
                            {playerData.player.isPlaying && station._id === playerData.station._id && <SvgIcon iconName={"libraryPlayButton"} />} {/* song is playing AND song is selected, show pause button */}
                        </div>
                    }
                    <img src={station.thumbnail} />
                </div>
                <div className='library-station-details'>
                    <h1 style={station._id === playerData.station._id ? { color: '#1ed761' } : { color: '#FFF' }}>{station.name}</h1>
                    <p>Station • {station.addedBy}</p>
                </div>
            </div>

        </Link>
    )
}

//${station._id}

//<img src={station.thumbnail}/>