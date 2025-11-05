# StationOne

Personal Note:
Hello, this is my final project that I developed during (And still developing!) the full stack course.
In 2 words, this is a spotify clone that has been developed from scratch (no not the language :) ).
If you see the word Station, you can read it as a Playlist, although im doing things differently behind the scenes, since I am avoiding storing spotify's data, so just for clarification, Station = user-made playlist (inside stationone), Playlist = user/spotify made playlist, fetched from spotify API.
No songs were stored, all songs go through youtube and youtube api (Google Cloud).
If there are any concerns with copyright issues, please contact me at email: Timurhamidov@gmail.com


## Technologies Used:

- Languages: **HTML**, **JS**, **SCSS** (css)
- MERN stack, which includes **MongoDB-ExpressJS-ReactJS-NodeJS**.
- Redux of course for great state management.
- For peer-to-peer shared listening, im using **SocketIO**.
- RESTful API (if you can call it a tech), using expressjs and nodejs as stated earlier.
- Public libraries like ReactPlayer and ColorThief.
- Cryptr and Bcrypt for password encryption.
- Nodemon for making our QoL brighter while writing code.
- Used Spotify and Google Cloud APIs to get songs, playlists, albums data.
- And a few smaller-scale technologies.


## Currently working parts:

- User authentication fully works.
- Adding/Removing playlists and albums from and to the library is fully working.
- Listening, Skipping, Stopping, Volume and Seeking (skipping to a certain part in the song) fully works.
- Mobile integration is not the best right now, but I am activly working on it, some parts do work while others don't, but playing/pausing songs should work properly, will add more player features soon.
- Homepage stations are random according to the set genres which are also accessible (Either I am going to leave it as hard-coded genres, or im going to make a list which will have randomly picked genres out of it, since genres/charts spotify apis are deprecated).
- You can listen to your own spotify playlist as long as its public (easier if its name is also unique, or the playlist is highly popular) and you can either search it up using the serach bar, or take the spotify playlist id and insert it into /StationOne/playlist/*YourPlaylistSpotifyId*.
- Searching using search bar works, currently listening to songs and checking out artists are not available.
- Accessing playlist/albums through search bar properly works.
- Looking up and adding songs to your station (which was created inside StationOne) works, aswell as editing your station details.
- Listening to playlists and albums with your friends or whoever you shared the code to, works.
- More features are always on the way so stay tuned!


## Pictures:

I will add some pictures from the web-app aswell as an explanation video.
