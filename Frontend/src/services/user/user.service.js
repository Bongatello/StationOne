import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'

export const userService = {
    addStation,
    loadUserStations,
    addToLikedStations,
}


const STORAGE_KEY = "userDB"

const user = {
    pfp: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
    likedSongs: ['v1w2x'],
    likedStations: [
        {
        _id: 'b2c3d',
        name: 'Groove Street',
        tags: ['Funk', 'Soul'],
        addedBy: 'StationOne',
        thumbnail: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qb9q2pfgdss7mjmseqx86h%2F1753130330_img_0.webp?st=2025-07-21T19%3A10%3A33Z&se=2025-07-27T20%3A10%3A33Z&sks=b&skt=2025-07-21T19%3A10%3A33Z&ske=2025-07-27T20%3A10%3A33Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=rW2lRdsjHw9y%2BQD2X4%2Faa3R3QotwmRHDQiW46Q5sTY8%3D&az=oaivgprodscus',
        songs: [
          { id: 'v1w2x', title: 'Parliament - Give Up The Funk', url: 'https://www.youtube.com/watch?v=R4_PdBhJSYQ', imgUrl: 'https://i.ytimg.com/vi/R4_PdBhJSYQ/mqdefault.jpg', addedAt: 1689945600, length: '5:46' },
          { id: 'y3z4a', title: 'Sly & The Family Stone - Family Affair', url: 'https://www.youtube.com/watch?v=Or8p4Q6tYzI', imgUrl: 'https://i.ytimg.com/vi/Or8p4Q6tYzI/mqdefault.jpg', addedAt: 1689945600, length: '5:19' },
          { id: 'b5c6d', title: 'The Isley Brothers - Shout', url: 'https://www.youtube.com/watch?v=Ed8gc9GUydo', imgUrl: 'https://i.ytimg.com/vi/Ed8gc9GUydo/mqdefault.jpg', addedAt: 1689945600, length: '5:05' },
          { id: 'e7f8g', title: 'Earth, Wind & Fire - September', url: 'https://www.youtube.com/watch?v=Gs069dndIYk', imgUrl: 'https://i.ytimg.com/vi/Gs069dndIYk/mqdefault.jpg', addedAt: 1689945600, length: '3:35' },
          { id: 'h9i0j', title: 'Tower of Power - What Is Hip?', url: 'https://www.youtube.com/watch?v=PsH-PQ8IOGg', imgUrl: 'https://i.ytimg.com/vi/PsH-PQ8IOGg/mqdefault.jpg', addedAt: 1689945600, length: '3:52' },
        ],
      },
      {
        _id: 'c3d4e',
        name: 'Soul Revival',
        tags: ['Soul', 'Funk'],
        addedBy: 'StationOne',
        thumbnail: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qbnw1jff293beqmdarjvq6%2F1753130726_img_1.webp?st=2025-07-21T19%3A12%3A05Z&se=2025-07-27T20%3A12%3A05Z&sks=b&skt=2025-07-21T19%3A12%3A05Z&ske=2025-07-27T20%3A12%3A05Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=7Mj3Hll2AWg7iMY0x4AhJJ%2Bfjijrw54r%2FEflo9j2dNQ%3D&az=oaivgprodscus',
        songs: [
          { id: 'k1l2m', title: 'Al Green - Let’s Stay Together', url: 'https://www.youtube.com/watch?v=COiIC3A0ROM', imgUrl: 'https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg', addedAt: 1689945600, length: '3:18' },
          { id: 'n3o4p', title: 'Otis Redding - (Sittin’ On) The Dock of the Bay', url: 'https://www.youtube.com/watch?v=rTVjnBo96Ug', imgUrl: 'https://i.ytimg.com/vi/rTVjnBo96Ug/mqdefault.jpg', addedAt: 1689945600, length: '2:43' },
          { id: 'q5r6s', title: 'Bill Withers - Ain’t No Sunshine', url: 'https://www.youtube.com/watch?v=tIdIqbv7SPo', imgUrl: 'https://i.ytimg.com/vi/tIdIqbv7SPo/mqdefault.jpg', addedAt: 1689945600, length: '2:05' },
          { id: 't7u8v', title: 'Marvin Gaye - Let’s Get It On', url: 'https://www.youtube.com/watch?v=x6QZn9xiuOE', imgUrl: 'https://i.ytimg.com/vi/x6QZn9xiuOE/mqdefault.jpg', addedAt: 1689945600, length: '4:03' },
          { id: 'w9x0y', title: 'Gladys Knight & The Pips - Midnight Train to Georgia', url: 'https://www.youtube.com/watch?v=5qi3mxNu6nM', imgUrl: 'https://i.ytimg.com/vi/5qi3mxNu6nM/mqdefault.jpg', addedAt: 1689945600, length: '4:34' },
        ],
        
      },
    ],

    recentStations: ['b2c3d'],
    createdStationsCount: 0,
}

function getEmptyStation(index){
    const newStation = {
      _id: makeId(5),
      name: `My Station #${index}`,
      tags: [],
      addedBy: 'Default User',
      thumbnail: 'https://www.vicentenews.com/wp-content/uploads/2024/08/DJ-Maphorisa-Kabza-De-Small-OSKIDO-Afro-Wave-feat.-Olodum-Tman-Xpress-Phila-Dlozi.png',
      songs: [],
    }
    return newStation
}


function addStation() {
	let storedUser = loadFromStorage(STORAGE_KEY)

	
	if (!storedUser) {
		storedUser = { ...user }
		saveToStorage(STORAGE_KEY, storedUser)
	}

	if (!Array.isArray(storedUser.likedStations)) {
		storedUser.likedStations = []
	}

	const newIndex = storedUser.createdPlaylistsCount + 1
	const myNewStation = getEmptyStation(newIndex)

	storedUser.createdPlaylistsCount = newIndex
	storedUser.likedStations.unshift(myNewStation)

	saveToStorage(STORAGE_KEY, storedUser)
	return storedUser
}


function loadUserStations() {
	let storedUser = loadFromStorage(STORAGE_KEY)

	
	if (!storedUser) {
		storedUser = { ...user }
		saveToStorage(STORAGE_KEY, storedUser)
	}

	if (!Array.isArray(storedUser.likedStations)) {
		storedUser.likedStations = []
	}

	return storedUser.likedStations
}


function addToLikedStations(station) {

    const myUser = loadFromStorage(STORAGE_KEY)

    myUser.likedStations.unshift(station)

	saveToStorage(STORAGE_KEY, myUser)
	return myUser

}

function removeFromUserLiked(station) {



}