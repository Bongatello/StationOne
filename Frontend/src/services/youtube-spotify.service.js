import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY //my youtube api key is inside the .env file which is included in .gitignore



/* export async function getYoutubeSong(inputData) {
    const res = await fetch(`http://localhost:3000/api/sy/youtube?q=${encodeURIComponent(inputData)}`)
    //const res = await fetch()
    const data = await res.json()
    return data
}

export async function queryByText(text) {
    const res = await axios.get(`http://localhost:3000/api/sy/songs`, {params: {q: text}})
    return res.data
}
 */




