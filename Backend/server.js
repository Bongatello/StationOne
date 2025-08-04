import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors'


dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
  }))

app.get('/api/youtube-search', async (req, res) => {
  const inputData = req.query.q;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!inputData) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(
      inputData
    )}&type=video&part=id`;

    const youtubeRes = await fetch(url);
    const data = await youtubeRes.json();

    res.json(data);
  } catch (error) {
    console.error('YouTube API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});