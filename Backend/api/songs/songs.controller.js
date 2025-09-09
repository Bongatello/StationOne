import { songsService } from "./songs.service.js"


export async function getSongFromDB(req, res) {
    try{
        const reqSong = req.params.songId
        if (!reqSong) throw 'Missing songId in songsController.getSongFromDB'
        const resSong = await songsService.lookupSong(reqSong)
        if (resSong) res.send(resSong)
        else res.send(null)
    } catch(err) {
        console.log('There was an error getting requested song from DB', err)
        throw err
    }
}

export async function addSongToDB(req, res) {
    try{
        const {spotifySongId, youtubeSongId} = req.body
        if (!spotifySongId || !youtubeSongId) throw('Missing spotifySongId or youtubeSongId in songsController.addSongToDB')
        await songsService.addSong(spotifySongId, youtubeSongId)
        res.send('Successfully added song to the DB!')
    } catch(err) {
        console.log('There was an error adding requested song to DB', err)
        throw err
    }
}