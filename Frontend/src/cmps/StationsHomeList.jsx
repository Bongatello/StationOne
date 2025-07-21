

export function StationsHomeList({station, genre}) {
    console.log(station.name)
    return(
        <div>
            <p>The station {station.name} is in the {genre} genre</p>
        </div>
    )
}