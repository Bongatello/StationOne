import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY //my youtube api key is inside the .env file which is included in .gitignore

export async function oldGetYoutubeSong (inputData) {
    
    const searchParams = {
        q: inputData,
        type: 'video',
        part: 'id',
        key: API_KEY,
    }


    const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${searchParams.key}&q=${searchParams.q}&type=${searchParams.type}&part=${searchParams.part}`)

    return res.data
}

export async function getYoutubeSong(inputData) {
    const res = await fetch(`http://localhost:3000/api/youtube-search?q=${encodeURIComponent(inputData)}`);
    const data = await res.json();
    return data;
  }