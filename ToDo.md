So this is where I will plan future updates..

Features:
-better player redux
-some default playlists from spotify api
-move to atlas mongodb
-add player to all pages/components as a redux state
-add play-list and make it go through all songs only once, without repeating songs
-add shuffle
-socket io? (advanced)
-station editing (thumbnail, name, tags etc.)
-removing station from likedStations (sync it with mongodb)
-seek and duration on player


Fixes:
-adding song to station doesnt cause re-render through useEffect for some reason
-volume bar css
-seek css
-player now playing song details