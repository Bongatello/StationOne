import { storageService } from "./async-storage.service"

export function makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function removeFromStorage(key, value) {
    localStorage.removeItem(key, JSON.stringify(value))
}

export function getDuration(type, value) {
    var resolution = 1
    if (type === 'ms') resolution = 1000
    if (type === 'seconds') resolution = 1
    const minutes = Math.floor(value / (60 * resolution))
    const seconds = Math.floor((value % (60 * resolution)) / resolution)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function formatStationDuration(value) {
    var hours = 0
    if (value > 3600000) {
        hours = Math.floor(value / 60000 / 60)
        value = value - (hours * 60000 * 60)
    }
    const minutes = Math.floor(value / (60000))
    const seconds = Math.floor((value % (60000)) / 1000)
    if (hours) return `${hours} hr ${minutes} min`
    return `${minutes} min ${seconds} sec`
}

export function getTopResult(searchValue, songs, artists, albums, playlists) {

    const songRegex = new RegExp("song", 'i')
    const artistRegex = new RegExp("artist", 'i')
    const albumRegex = new RegExp("album", 'i')
    const playlistRegex = new RegExp("playlist", 'i')

    if (songRegex.test(searchValue)) return { type: 'Song', title: songs[0].songName, thumbnail: songs[0].cover, artist: songs[0].artists.join(', ') }
    if (artistRegex.test(searchValue)) return { type: 'Artist', title: artists[0].name, thumbnail: artists[0].thumbnail }
    if (albumRegex.test(searchValue)) return { type: 'Album', title: albums[0].name, thumbnail: albums[0].thumbnail, artist: albums[0].artists }
    if (playlistRegex.test(searchValue)) return { type: 'Playlist', title: playlists[0].name, thumbnail: playlists[0].thumbnail, artist: playlists[0].addedBy }
    console.log('Not really looking for something specific, so returning a song')
    return { type: 'Song', title: songs[0].songName, thumbnail: songs[0].cover, artist: songs[0].artists.join(', ') }

}

export function getCapitalizedWord(word) {
    const firstLetter = word?.charAt(0)
    return firstLetter?.toUpperCase() + word?.substring(1)
}

export function msTimeout(millisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}