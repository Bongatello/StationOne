export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function throttle(func, wait) {
    let isWaiting = false
    return (...args) => {
        if (isWaiting) return
        func(...args)
        isWaiting = true
        setTimeout(() => {
            isWaiting = false
        }, wait)
    }
}

export function debounce(func, wait) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, wait)
    }
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
    const firstLetter = word.charAt(0)
    return firstLetter.toUpperCase() + word.substring(1)
}