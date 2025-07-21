import { Link } from "react-router-dom";
import { stationService } from "../services/station/station.service.js"
import { useEffect, useState } from "react";
import { StationsHomeList } from "../cmps/StationsHomeList.jsx"
import { loadFromStorage } from "../services/util.service.js";


export function HomePage() {

    const [stations, setStations] = useState(null)

    useEffect(() => {
        const stations = stationService.loadStations()
        setStations(stations)
    }, [])

    if (!stations || !stations.length) {
        return <p>Loading stations...</p>
    }
    console.log('loaded stations', stations)
    return (
        <section>
            <h1>Here I will add some stations that are related to the user</h1>
            {stations.map(station => {
                if(station.tags.includes('Funk')){
                    return (
                        <div>
                            <StationsHomeList station={station} genre={'Funk'}/>
                        </div>
                        )
                }
                else if(station.tags.includes('Electronic')){
                    return (
                        <div>
                            <StationsHomeList station={station} genre={'Electronic'}/>
                        </div>
                        )
                }
                else if(station.tags.includes('Hip-Hop')){
                    return (
                        <div>
                            <StationsHomeList station={station} genre={'Hip-Hop'}/>
                        </div>
                        )
                }
                else if(station.tags.includes('Rock')){
                    return (
                        <div>
                            <StationsHomeList station={station} genre={'Rock'}/>
                        </div>
                        )
                }
                else if(station.tags.includes('R&B')){
                    return (
                        <div>
                            <StationsHomeList station={station} genre={'R&B'}/>
                        </div>
                        )
                }
            }

            )}
        </section >
    )
}

