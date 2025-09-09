
var SpotifyTemporaryToken = undefined
/* var SpotifyTemporaryToken = {
  token: undefined,
  expiration: null //(Data.now - expiration === 1 hour (ms))= expired
} */
export const spotifyYoutubeService = {
  getTempSpotifyToken,
  processSpotifyQueryData,
  getSpotifyQueryData,
  getYoutubeVideo,
}

async function getTempSpotifyToken() {
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

async function processSpotifyQueryData(queryData, q, limit) {
  try {
    const queryResults = await queryData.json()
    const myQueryResults = []

    if (!queryResults) getSpotifyQueryData(q, limit)
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

    return myQueryResults
  } catch (err) {
    console.log('Error in backend spotify.service, processSpotifyQueryData function')
    SpotifyTemporaryToken = await getTempSpotifyToken()

    throw err
  }
}

async function getSpotifyQueryData(q, limit) {
  //if we dont have a spotify api token (the temporary one you get using id+secret), we use the function getTempSpotifyToken which sends the credentials again to get a new token, else just go straight into querying spotify api
  if (!SpotifyTemporaryToken) SpotifyTemporaryToken = await getTempSpotifyToken()

  //now we get search results from spotify according to our frontend query parameter using a fetch request
  const unprocessedResults = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=${limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${SpotifyTemporaryToken}`
    }
  })
  
  //the response needs to be parsed and cleaned up from properties we dont need, so the next function does just that!
  const cleanQueryResults = await processSpotifyQueryData(unprocessedResults, q, limit)
  console.log('got cleanQueryResults: ', cleanQueryResults)
  return cleanQueryResults
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