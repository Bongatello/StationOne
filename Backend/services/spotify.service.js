
export const spotifyService = {
  getTempSpotifyToken,
  processQueryData,
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

async function processQueryData(queryData) {
  try {
    const queryResults = await queryData.json()
    const myQueryResults = []

    if (!queryResults) throw 'spotify-service: processQueryData: Error:No queryData provided'
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
    console.log('Error in backend spotify.service, processQueryData function')
    throw err
  }
}