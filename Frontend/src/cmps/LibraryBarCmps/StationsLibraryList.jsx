import { useSelector } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { setPlayerStation, setPlayingSong, togglePlayerState } from '../../store/player.actions'
import { songsService } from '../../services/songs/songs.service'
import { stationService } from '../../services/station/station.service'
import SvgIcon from '../SvgIcon'
import { useEffect } from 'react'

export function StationsLibraryList({ station, userData, playerData }) {

    const location = useLocation()
    const route = location.pathname.split("/")[2]

    useEffect(() => {

    }, [playerData.station?._id])

    async function playPauseLogic() {
        console.log('Clicked!', station)
        try {
            if (station.route === 'station' && !station.containsSongs) return
            /* else if (!(station._id === playerData.station?._id)) {
                setPlayerStation(station._id, userData)
                const tempStation = await stationService.get(station._id)
                songsService.findOnYoutube(tempStation.songs[0])
                togglePlayerState(true)
            }
            else {
                togglePlayerState(!playerData.player.isPlaying)
            } */

            if ((station.route === 'station' && playerData.station?._id === station._id) || (!(station.route === 'station') && playerData.station?.spotifyApiId === station._id)) {
                togglePlayerState(!playerData.player.isPlaying)
                console.log('Im here')
                console.log('route: ', station.route)
                console.log('playerData.station?._id === station._id: ', playerData.station?._id === station._id)
                console.log(`!(station.route === 'station'): `,!(station.route === 'station'))
                console.log('playerData.station?.spotifyApiId === station.spotifyApiId', playerData.station?.spotifyApiId === station.spotifyApiId)
                console.log(((station.route === 'station' && playerData.station?._id === station._id) || (!(station.route === 'station') && playerData.station?.spotifyApiId === station._id)))
            }
            else { //untested, needs test before going to the next task
                console.log('debugging data: ', route, station._id || station.spotifyApiId, userData)
                await setPlayerStation(route, station._id || station.spotifyApiId, userData)
                console.log(playerData.station)
                /* setPlayingSong(playerData.station.songs[0])
                songsService.findOnYoutube(playerData.station.songs[0]) */
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
                            {playerData.player.isPlaying && ((route === 'station' && playerData.station?._id === station._id) || (!(route === 'station') && playerData.station?.spotifyApiId === station.spotifyApiId)) ? <SvgIcon iconName={"libraryPlayButton"} /> : <SvgIcon iconName={"libraryPauseButton"} />} {/* song is not playing OR song is not selected, show play button */}
                        </div>
                    }
                    <img src={station.thumbnail} />
                </div>
                <div className='library-station-details'>
                    <h1 style={station._id === playerData.station?._id ? { color: '#1ed761' } : { color: '#FFF' }}>{station.name}</h1>
                    <p>Station • {station.addedBy}</p>
                </div>
            </div>

        </Link>
    )
}

//${station._id}

//<img src={station.thumbnail}/>