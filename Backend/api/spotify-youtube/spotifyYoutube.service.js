
var SpotifyTemporaryToken = undefined

const spotifyByPlaylistFields = "fields=next%2Citems%28added_at%2Ctrack%28name%2Cduration_ms%2Cexternal_urls%28spotify%29%2Cid%2Cexplicit%2Cartists%28name%29%2Calbum%28images%2Crelease_date%2Cname%29%29%29&limit=50"
/* var SpotifyTemporaryToken = {
  token: undefined,
  expiration: null //(Data.now - expiration === 1 hour (ms))= expired
} */
export const spotifyYoutubeService = {
  getSpotifySongs,
  getYoutubeVideo,
  getSpotifyStations,
  getSpotifyStationSongsById,
}



async function getSpotifySongs(q, limit) {
  //if we dont have a spotify api token (the temporary one you get using id+secret), we use the function getTempSpotifyToken which sends the credentials again to get a new token, else just go straight into querying spotify api
  if (!SpotifyTemporaryToken) SpotifyTemporaryToken = await _getTempSpotifyToken()

  //now we get search results from spotify according to our frontend query parameter using a fetch request
  const unprocessedResults = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=${limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${SpotifyTemporaryToken}`
    }
  })
  //the response needs to be parsed and cleaned up from properties we dont need, so the next function does just that!
  const cleanQueryResults = await _processSpotifyQueryData(unprocessedResults)
  console.log('got cleanQueryResults: ', cleanQueryResults)
  return cleanQueryResults
}


async function getSpotifyStations(genres, limit) {
  if (!SpotifyTemporaryToken) SpotifyTemporaryToken = await _getTempSpotifyToken()
  var genresStations = {}
  const genresArray = genres.split(",").map(g => g.trim())
  console.log(genresArray)
  for (const genre of genresArray) {
    const unprocessedStations = await fetch(`https://api.spotify.com/v1/search?q=genre:${genre}&type=playlist&limit=${limit}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${SpotifyTemporaryToken}`
      }
    })
    const cleanQueryResults = await _processSpotifyQueryData(unprocessedStations)
    genresStations[genre] = cleanQueryResults
    console.log(`Processed ${genre}:`, cleanQueryResults)
  }
  return genresStations
}


async function getSpotifyStationSongsById(id) {
  if (!SpotifyTemporaryToken) SpotifyTemporaryToken = await _getTempSpotifyToken()
  var unprocessedNextResults = null
  const unprocessedResults = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?${spotifyByPlaylistFields}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${SpotifyTemporaryToken}`
    }
  })
  var unprocessedResultsParsed = await unprocessedResults.json()
  var togetherItems = unprocessedResultsParsed
  while (unprocessedResultsParsed.next) {
    unprocessedNextResults = await fetch(unprocessedResultsParsed.next, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${SpotifyTemporaryToken}`
      }
    })
    unprocessedResultsParsed = await unprocessedNextResults.json()
    togetherItems.items.push(...unprocessedResultsParsed.items)
  }
  await togetherItems.items.forEach(item => {
    item.track.artists = item.track.artists.map(artist => artist.name)
  })
  return togetherItems.items
}


async function getYoutubeVideo(inputData) {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
    const googleApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(
      inputData
    )}&type=video&part=id`

    const youtubeRes = await fetch(googleApiUrl)
    const data = await youtubeRes.json()
    return data
  } catch (err) {
    console.log('SpotifyYoutubeService: There was an error getting youtube video:', err)
    throw err
  }
}










async function _processSpotifyQueryData(queryData) {
  try {
    const queryResults = await queryData.json()
    const myQueryResults = []
    console.log('processing data ', queryResults)

    if (queryResults.tracks) {
      console.log('getting tracks...')
      queryResults.tracks.items.forEach(item => {
        const artistNames = item.artists.map(artist => artist.name)
        const newItem = {
          artists: artistNames,
          songName: item.name,
          images: item.album.images,
          releaseDate: item.album.release_date,
          durationMs: item.duration_ms,
          spotifyLink: item.external_urls.spotify,
          albumName: item.album.name,
          _id: item.id,
          isExplicit: item.explicit,
        }

        myQueryResults.push(newItem)
      })
    }

    if (queryResults.playlists) {
      queryResults.playlists.items.forEach(item => {
        if (item) {
          const newItem = {
            thumbnail: item.images[0].url,
            desc: item.description,
            spotifyApiId: item.id,
            name: item.name,
            addedBy: item.owner.display_name,
          }
          myQueryResults.push(newItem)
        }
      })
    }

    return myQueryResults
  } catch (err) {
    console.log('Error in backend spotify.service, processSpotifyQueryData function')
    SpotifyTemporaryToken = await _getTempSpotifyToken()

    throw err
  }
}


async function _getTempSpotifyToken() {
  const ClientID = process.env.SPOTIFY_CLIENT_ID
  const ClientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const credentials = `${ClientID}:${ClientSecret}`
  const base64Cred = Buffer.from(credentials).toString('base64') //after taking my client id and client secret I made base64 credentials out of them to pass into spotify api as a header


  //Post request to spotify api, which we send our base64Cred as auth header, content-type header, and body "grant_type", just some spotify magic
  const tokenFetch = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64Cred}`
    },
    body: "grant_type=client_credentials",
  })

  //Response data processing and storing the temporary access token itself on my API
  const data = await tokenFetch.json()
  console.log(data.access_token)
  return data.access_token
}