import { useSelector } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { setPlayerStation, setPlayingSong, togglePlayerState } from '../../store/player.actions'
import { songsService } from '../../services/songs/songs.service'
import { stationService } from '../../services/station/station.service'
import SvgIcon from '../SvgIcon'
import { useEffect } from 'react'
import { msTimeout } from '../../services/util.service'

export function StationsLibraryList({ station, userData, playerData }) {

    const location = useLocation()
    const route = location.pathname.split("/")[2]

    useEffect(() => {

    }, [playerData.station?._id])

    async function playPauseLogic() {
        console.log('Clicked!', station)
        console.log(playerData.player.isPlaying ? 'not playing anything' : !station._id ? 'no station id' : (station._id === playerData.station.spotifyApiId) ? 'station id matches spotifyapiid' : (station._id === playerData.station._id) ? 'station id matches id' : 'nothing works')
        try {
            if (station.route === 'station' && !station.containsSongs) return
            if ((station.route === 'station' && playerData.station?._id === station._id) || (!(station.route === 'station') && playerData.station?.spotifyApiId === station._id)) {
                togglePlayerState(!playerData.player.isPlaying)
            }
            else { //untested, needs test before going to the next task
                console.log('debugging data: ', station.route, station._id || station.spotifyApiId, userData)
                const newPlayerStation = await setPlayerStation(station.route, station._id || station.spotifyApiId, userData)
                setPlayingSong(newPlayerStation.songs[0])
                songsService.findOnYoutube(newPlayerStation.songs[0])
                togglePlayerState(true)
            }
        } catch (err) {
            console.log('StationsLibraryList(cmp): There was an error playing/pausing station, ', err)
            throw err
        }
    }

    return (
        <Link to={`/StationOne/${station.route}/${station._id}`}>

            <div className='library-station-object'>
                <div className='svg-thumbnail'>
                    {
                        <div onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            playPauseLogic()
                        }}>
                            {!playerData.player.isPlaying ? <SvgIcon iconName={'libraryPlayButton'}/> : !station._id ? <SvgIcon iconName={'libraryPlayButton'}/> : (playerData.station.spotifyApiId !== undefined) && (station._id === playerData.station.spotifyApiId) ? <SvgIcon iconName={"libraryPauseButton"} /> : (playerData.station._id !== undefined) && (station._id === playerData.station._id) ? <SvgIcon iconName={"libraryPauseButton"} />  : <SvgIcon iconName={"libraryPlayButton"} />} {/* song is not playing OR song is not selected, show play button, older logic: ((route === 'station' && playerData.station?._id === station._id) || ((route !== 'station') && (playerData.station?.spotifyApiId === station._id))) */}
                        </div>
                    }
                    <img src={station.thumbnail} />
                </div>
                <div className='library-station-details'>
                    <h1 style={((playerData.station._id !== undefined) && (playerData.station._id === station._id)) || ((playerData.station.spotifyApiId !== undefined) && (playerData.station.spotifyApiId === station._id)) ? { color: '#1ed761' } : { color: '#FFF' }}>{station.name}</h1>
                    <p>Station • {station.addedBy}</p>
                </div>
            </div>

        </Link>
    )
}