So this is where I will plan future updates..

Features:
Most significant features:
-Modals (smart modal component)                                                                                     done, just needs more dynamic cmps
-playing gif wherever needed                                                                                        added in some places
-mobile version                                                                                                     currently working on it
-clone playlist
-Explore (or browse, whatever its called) page      


Less significant feautres:
-Get more songs from the spotify playlists (limited to 100 currently)
-Add explicit icon to explicit songs on stations
-add shuffle (advanced)


Fixes:
-Use .env with node
-add res status codes to errors in throw/catch on the backend side
-Look for more bugs or potential fixes in code by letting friends use the site? just like beta testing
-fix station name shrinking weirdly
-Change library list to get album/station/playlist type
-Can't skip songs in albums



-Mobile CSS progression:

-Station Preview was almost done until i noticed that the mobile web version is outdated, and the app looks a little different, except that its lookin good
-Fixed double players being enabled (2 player components being mounted)
-Need to add ColorThief to the player
-Need to add links to different pages on footer, and create the footer itself, should be really easy because its only literally only 4 svgs + 3 links, and a create-button-modal
-Need to add "back" button to stations topleft
-Need to add a "stopped playing" visualizer to the songs in stations (since I couldnt really find the svg for it due to it appearing only inside the updated app)
-More changes to the updated mobile station

-More mobile pages (library, home and search, should be easy if using the existing ones)




Notes to remember for the next day:

Maybe making a globap ReactPlayer instead of having it inside the MediaPlayer/MobileMediaPlayer etc. would be better, because when going changing between them and the experimental full screen media player it just stops the song, and restarts it.

Pretty much finished the footer for mobile except for the functionality of create button and colorthief for the song/player bar and will need to work on liked-songs station asap (for the heart button)

Library page for mobile works, but maybe some changes will have to happen

Mobile search page needs to be created, currently shows an empty page

Remember to rely on mobile app more because its the actual thing, since the mobile-webapp isnt actually updated

Margins on homepage are different on mobile

Add option to listen to a song from search and song query on playlists





10/21/25 - working on fixing common issues with playability of albums and stations, currently stopped at play/pause button of each since its really working right

-Fix an issue with playing station/album/playlist not being shown right on the librarybar