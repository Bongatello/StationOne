import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, saveToStorage, loadFromStorage } from '../util.service'
import { userService } from '../user/user.service.js'
import axios from 'axios';

const BASE_URL = '//localhost:3000/api/station'

export const stationService = {
    query,
    get,
    addSong,
    loadStations,
    combineUserDefaultStations,
}


const STORAGE_KEY = 'stationsDB';

function query(filterBy = {}) {

    if (!stations || !stations.length) {
        saveToStorage(STORAGE_KEY, stations)
        return stations
    }

    return storageService.query(STORAGE_KEY).then(stations => {
        if (!filterBy.txt) return stations

        const regExp = new RegExp(filterBy.txt, 'i')
        return stations.filter(station =>
            station.tags.some(tag => regExp.test(tag))
        )
    })
}

async function loadStations(){
  const storedStations = await axios.get(BASE_URL)

  return storedStations.data
  /*   let storedStations = loadFromStorage(STORAGE_KEY)
    if (!storedStations || !storedStations.length) {
        saveToStorage(STORAGE_KEY, stations)
        storedStations = stations
    }
    return storedStations */
}

async function get(stationId){
    const station = await axios.get(`${BASE_URL}/${stationId}`)
    console.log('got station: ', station)
    return station.data
}

function addSong(stationID, title, url, imgUrl, addedAt, length) {
    const index = stations.findIndex(station => station._id === stationID)
    const newSong= {}
    if (index>=0) {
        newSong.id=makeId(5)
        newSong.title=title
        newSong.url=url
        newSong.imgUrl=imgUrl
        newSong.addedAt=addedAt
        newSong.length=length
        stations[index].songs.push(newSong)
    }
    saveToStorage(STORAGE_KEY, stations)
}


async function combineUserDefaultStations() {
  const userStations = await userService.loadUserData()

  const currentStationList = await loadStations()

  const mergedStations = [...currentStationList]

  userStations.likedStations.forEach(userStation => {
    const exists = currentStationList.some(station => station._id === userStation._id)
    if (!exists) mergedStations.push(userStation)
  })

  saveToStorage(STORAGE_KEY, mergedStations)

  return mergedStations
}







export const stations = [ //demodata
    // 5 Funk/Soul stations
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
    {
      _id: 'd4e5f',
      name: 'Funky Fresh',
      tags: ['Funk', 'Dance'],
      addedBy: 'StationOne',
      thumbnail: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qbvr1zf08r80hsm846972t%2F1753130914_img_0.webp?st=2025-07-21T19%3A13%3A23Z&se=2025-07-27T20%3A13%3A23Z&sks=b&skt=2025-07-21T19%3A13%3A23Z&ske=2025-07-27T20%3A13%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=HE0mvCob8B9xot2cc3WWSoEv0%2FWw%2BGhtHzjpFTc9%2Few%3D&az=oaivgprodscus',
      songs: [
        { id: 'z1a2b', title: 'Chic - Le Freak', url: 'https://www.youtube.com/watch?v=h1qQ1SKNlgY', imgUrl: 'https://i.ytimg.com/vi/h1qQ1SKNlgY/mqdefault.jpg', addedAt: 1689945600, length: '5:27' },
        { id: 'c3d4e', title: 'Rick James - Super Freak', url: 'https://www.youtube.com/watch?v=QYHxGBH6o4M', imgUrl: 'https://i.ytimg.com/vi/QYHxGBH6o4M/mqdefault.jpg', addedAt: 1689945600, length: '3:24' },
        { id: 'f5g6h', title: 'Prince - Kiss', url: 'https://www.youtube.com/watch?v=H9tEvfIsDyo', imgUrl: 'https://i.ytimg.com/vi/H9tEvfIsDyo/mqdefault.jpg', addedAt: 1689945600, length: '3:46' },
        { id: 'i7j8k', title: 'Earth, Wind & Fire - Boogie Wonderland', url: 'https://www.youtube.com/watch?v=3a9uh0y2jp0', imgUrl: 'https://i.ytimg.com/vi/3a9uh0y2jp0/mqdefault.jpg', addedAt: 1689945600, length: '4:46' },
        { id: 'l9m0n', title: 'The Gap Band - You Dropped A Bomb On Me', url: 'https://www.youtube.com/watch?v=YTPTpdl1PG8', imgUrl: 'https://i.ytimg.com/vi/YTPTpdl1PG8/mqdefault.jpg', addedAt: 1689945600, length: '5:00' },
      ],
    },
    {
      _id: 'e5f6g',
      name: 'Soul Groove',
      tags: ['Soul', 'Funk'],
      addedBy: 'StationOne',
      thumbnail: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qby34ae35szcgevj4jc6b4%2F1753130983_img_1.webp?st=2025-07-21T19%3A13%3A23Z&se=2025-07-27T20%3A13%3A23Z&sks=b&skt=2025-07-21T19%3A13%3A23Z&ske=2025-07-27T20%3A13%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=H0bMOZmYSh5PTZDW%2BBGN6bnHoAT2fcWU1%2FeMgq%2FGoJ0%3D&az=oaivgprodscus',
      songs: [
        { id: 'o1p2q', title: 'The Temptations - My Girl', url: 'https://www.youtube.com/watch?v=6IUG-9jZD-g', imgUrl: 'https://i.ytimg.com/vi/6IUG-9jZD-g/mqdefault.jpg', addedAt: 1689945600, length: '2:48' },
        { id: 'r3s4t', title: 'Aretha Franklin - Respect', url: 'https://www.youtube.com/watch?v=6FOUqQt3Kg0', imgUrl: 'https://i.ytimg.com/vi/6FOUqQt3Kg0/mqdefault.jpg', addedAt: 1689945600, length: '2:28' },
        { id: 'u5v6w', title: 'Sam & Dave - Soul Man', url: 'https://www.youtube.com/watch?v=3mN-5ao7Cw4', imgUrl: 'https://i.ytimg.com/vi/3mN-5ao7Cw4/mqdefault.jpg', addedAt: 1689945600, length: '2:44' },
        { id: 'x7y8z', title: 'Ray Charles - Hit The Road Jack', url: 'https://www.youtube.com/watch?v=O4o8TeqKhgY', imgUrl: 'https://i.ytimg.com/vi/O4o8TeqKhgY/mqdefault.jpg', addedAt: 1689945600, length: '2:00' },
        { id: 'a9b0c', title: 'Marvin Gaye - Heard It Through The Grapevine', url: 'https://www.youtube.com/watch?v=hajBdDM2qdg', imgUrl: 'https://i.ytimg.com/vi/hajBdDM2qdg/mqdefault.jpg', addedAt: 1689945600, length: '3:15' },
      ],
    },
  
    // 5 Electronic stations
    {
      _id: 'f6g7h',
      name: 'Electric Dreams',
      tags: ['Electronic', 'Dance'],
      addedBy: 'StationOne',
      thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qc0gffewj8c7s55kj80pc2%2F1753131067_img_1.webp?st=2025-07-21T19%3A11%3A56Z&se=2025-07-27T20%3A11%3A56Z&sks=b&skt=2025-07-21T19%3A11%3A56Z&ske=2025-07-27T20%3A11%3A56Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=wUnmXfeTgPRakmN1dMI4wASrMMpcKDc8P2GTDUCrgGc%3D&az=oaivgprodscus',
      songs: [
        { id: 'd1e2f', title: 'Daft Punk - One More Time', url: 'https://www.youtube.com/watch?v=FGBhQbmPwH8', imgUrl: 'https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg', addedAt: 1689945600, length: '5:20' },
        { id: 'g3h4i', title: 'Calvin Harris - Summer', url: 'https://www.youtube.com/watch?v=ebXbLfLACGM', imgUrl: 'https://i.ytimg.com/vi/ebXbLfLACGM/mqdefault.jpg', addedAt: 1689945600, length: '3:44' },
        { id: 'j5k6l', title: 'Zedd - Clarity', url: 'https://www.youtube.com/watch?v=IxxstCcJlsc', imgUrl: 'https://i.ytimg.com/vi/IxxstCcJlsc/mqdefault.jpg', addedAt: 1689945600, length: '4:31' },
        { id: 'm7n8o', title: 'Avicii - Wake Me Up', url: 'https://www.youtube.com/watch?v=IcrbM1l_BoI', imgUrl: 'https://i.ytimg.com/vi/IcrbM1l_BoI/mqdefault.jpg', addedAt: 1689945600, length: '4:07' },
        { id: 'p9q0r', title: 'Deadmau5 - Ghosts N Stuff', url: 'https://www.youtube.com/watch?v=h7ArUgxtlJs', imgUrl: 'https://i.ytimg.com/vi/h7ArUgxtlJs/mqdefault.jpg', addedAt: 1689945600, length: '3:21' },
      ],
    },
    {
      _id: 'g7h8i',
      name: 'Chill Vibes',
      tags: ['Electronic', 'Chill'],
      addedBy: 'StationOne',
      thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qc2xd9f59se28p4631pav4%2F1753131110_img_1.webp?st=2025-07-21T19%3A12%3A01Z&se=2025-07-27T20%3A12%3A01Z&sks=b&skt=2025-07-21T19%3A12%3A01Z&ske=2025-07-27T20%3A12%3A01Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=R9wtp5Owh5E5%2FpdPkvmbDVRYoKmyaIMsPUb8PxZ9%2Fpg%3D&az=oaivgprodscus',
      songs: [
        { id: 's1t2u', title: 'ODESZA - A Moment Apart', url: 'https://www.youtube.com/watch?v=F3YHzFqF3yQ', imgUrl: 'https://i.ytimg.com/vi/F3YHzFqF3yQ/mqdefault.jpg', addedAt: 1689945600, length: '4:02' },
        { id: 'v3w4x', title: 'Tycho - Awake', url: 'https://www.youtube.com/watch?v=ZXxIOLR3z4Q', imgUrl: 'https://i.ytimg.com/vi/ZXxIOLR3z4Q/mqdefault.jpg', addedAt: 1689945600, length: '4:43' },
        { id: 'y5z6a', title: 'Bonobo - Cirrus', url: 'https://www.youtube.com/watch?v=SQbXp_S17_U', imgUrl: 'https://i.ytimg.com/vi/SQbXp_S17_U/mqdefault.jpg', addedAt: 1689945600, length: '5:43' },
        { id: 'b7c8d', title: 'Nujabes - Feather', url: 'https://www.youtube.com/watch?v=CANcVzp-6qE', imgUrl: 'https://i.ytimg.com/vi/CANcVzp-6qE/mqdefault.jpg', addedAt: 1689945600, length: '5:17' },
        { id: 'e9f0g', title: 'FKJ - Tadow', url: 'https://www.youtube.com/watch?v=J2X5mJ3HDYE', imgUrl: 'https://i.ytimg.com/vi/J2X5mJ3HDYE/mqdefault.jpg', addedAt: 1689945600, length: '9:12' },
      ],
    },
    {
      _id: 'h8i9j',
      name: 'Synthwave Nights',
      tags: ['Electronic', 'Synthwave'],
      addedBy: 'StationOne',
      thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qc4019f2qsjx2854bdbvc0%2F1753131178_img_1.webp?st=2025-07-21T19%3A12%3A13Z&se=2025-07-27T20%3A12%3A13Z&sks=b&skt=2025-07-21T19%3A12%3A13Z&ske=2025-07-27T20%3A12%3A13Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=5ZEz7LaANkVuHnFYdZ7%2Bf2Bj2oilRypvMChekJdNAdY%3D&az=oaivgprodscus',
      songs: [
        { id: 'h1i2j', title: 'The Midnight - Days of Thunder', url: 'https://www.youtube.com/watch?v=lzvqDBr8PGo', imgUrl: 'https://i.ytimg.com/vi/lzvqDBr8PGo/mqdefault.jpg', addedAt: 1689945600, length: '4:50' },
        { id: 'k3l4m', title: 'M83 - Midnight City', url: 'https://www.youtube.com/watch?v=dX3k_QDnzHE', imgUrl: 'https://i.ytimg.com/vi/dX3k_QDnzHE/mqdefault.jpg', addedAt: 1689945600, length: '4:03' },
        { id: 'n5o6p', title: 'FM-84 - Running in the Night', url: 'https://www.youtube.com/watch?v=2egQfXhzJ5A', imgUrl: 'https://i.ytimg.com/vi/2egQfXhzJ5A/mqdefault.jpg', addedAt: 1689945600, length: '4:30' },
        { id: 'q7r8s', title: 'Gunship - Tech Noir', url: 'https://www.youtube.com/watch?v=SK5Xj-P2JKo', imgUrl: 'https://i.ytimg.com/vi/SK5Xj-P2JKo/mqdefault.jpg', addedAt: 1689945600, length: '5:12' },
        { id: 't9u0v', title: 'Lazerhawk - Overdrive', url: 'https://www.youtube.com/watch?v=R_h71sFZ9vw', imgUrl: 'https://i.ytimg.com/vi/R_h71sFZ9vw/mqdefault.jpg', addedAt: 1689945600, length: '5:07' },
    ],
  },
  {
    _id: 'i9j0k',
    name: 'Future Bass Flow',
    tags: ['Electronic', 'Future Bass'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qc614hek3s6sr4h43zzjkt%2F1753131249_img_0.webp?st=2025-07-21T19%3A12%3A13Z&se=2025-07-27T20%3A12%3A13Z&sks=b&skt=2025-07-21T19%3A12%3A13Z&ske=2025-07-27T20%3A12%3A13Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=B%2FtHvRGX7XaLV8CPke2RGcWGSzk60stDM4PocHSR8gg%3D&az=oaivgprodscus',
    songs: [
      { id: 'w1x2y', title: 'Flume - Never Be Like You', url: 'https://www.youtube.com/watch?v=PeonBmeFR8o', imgUrl: 'https://i.ytimg.com/vi/PeonBmeFR8o/mqdefault.jpg', addedAt: 1689945600, length: '3:54' },
      { id: 'z3a4b', title: 'San Holo - Light', url: 'https://www.youtube.com/watch?v=Qo1-QmHcKxk', imgUrl: 'https://i.ytimg.com/vi/Qo1-QmHcKxk/mqdefault.jpg', addedAt: 1689945600, length: '4:07' },
      { id: 'c5d6e', title: 'Illenium - Good Things Fall Apart', url: 'https://www.youtube.com/watch?v=cHHLHGNpCSA', imgUrl: 'https://i.ytimg.com/vi/cHHLHGNpCSA/mqdefault.jpg', addedAt: 1689945600, length: '3:42' },
      { id: 'f7g8h', title: 'Seven Lions - Rush Over Me', url: 'https://www.youtube.com/watch?v=WRdlr7WO44c', imgUrl: 'https://i.ytimg.com/vi/WRdlr7WO44c/mqdefault.jpg', addedAt: 1689945600, length: '4:02' },
      { id: 'i9j0k', title: 'MitiS - Shattered', url: 'https://www.youtube.com/watch?v=pMq8V04gZ2o', imgUrl: 'https://i.ytimg.com/vi/pMq8V04gZ2o/mqdefault.jpg', addedAt: 1689945600, length: '4:35' },
    ],
  },

  // 5 Hip-Hop stations
  {
    _id: 'j0k1l',
    name: 'Urban Legends',
    tags: ['Hip-Hop', 'Rap'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0v8dbqvft59jht119s8jdhq%2F1753261521_img_0.webp?st=2025-07-23T07%3A21%3A32Z&se=2025-07-29T08%3A21%3A32Z&sks=b&skt=2025-07-23T07%3A21%3A32Z&ske=2025-07-29T08%3A21%3A32Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=%2B8XcBZxYymwgt1VoACrEVKv0OsI9mm53IHeHTpJGfY0%3D&az=oaivgprodscus',
    songs: [
      { id: 'j1k2l', title: 'Kendrick Lamar - HUMBLE.', url: 'https://www.youtube.com/watch?v=tvTRZJ-4EyI', imgUrl: 'https://i.ytimg.com/vi/tvTRZJ-4EyI/mqdefault.jpg', addedAt: 1689945600, length: '2:57' },
      { id: 'm3n4o', title: 'J. Cole - No Role Modelz', url: 'https://www.youtube.com/watch?v=7e3LaJH8_3A', imgUrl: 'https://i.ytimg.com/vi/7e3LaJH8_3A/mqdefault.jpg', addedAt: 1689945600, length: '4:52' },
      { id: 'p5q6r', title: 'Nas - If I Ruled The World', url: 'https://www.youtube.com/watch?v=Hw8lz88jsV8', imgUrl: 'https://i.ytimg.com/vi/Hw8lz88jsV8/mqdefault.jpg', addedAt: 1689945600, length: '4:45' },
      { id: 's7t8u', title: 'Missy Elliott - Get Ur Freak On', url: 'https://www.youtube.com/watch?v=c2cMGQd8Yjg', imgUrl: 'https://i.ytimg.com/vi/c2cMGQd8Yjg/mqdefault.jpg', addedAt: 1689945600, length: '3:56' },
      { id: 'v9w0x', title: 'Dr. Dre - Still D.R.E.', url: 'https://www.youtube.com/watch?v=H9tEvfIsDyo', imgUrl: 'https://i.ytimg.com/vi/H9tEvfIsDyo/mqdefault.jpg', addedAt: 1689945600, length: '4:34' },
    ],
  },
  {
    _id: 'k1l2m',
    name: 'Golden Era',
    tags: ['Hip-Hop', 'Classic'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qcb95kfje9w6cy3t7tesds%2F1753131435_img_1.webp?st=2025-07-21T19%3A10%3A27Z&se=2025-07-27T20%3A10%3A27Z&sks=b&skt=2025-07-21T19%3A10%3A27Z&ske=2025-07-27T20%3A10%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Nx6YNc8m%2FcuDa%2FQMEuqLR7NlYi%2BvESGKwj42k2yze5M%3D&az=oaivgprodscus',
    songs: [
      { id: 'y1z2a', title: 'A Tribe Called Quest - Can I Kick It?', url: 'https://www.youtube.com/watch?v=13EifDbTx74', imgUrl: 'https://i.ytimg.com/vi/13EifDbTx74/mqdefault.jpg', addedAt: 1689945600, length: '4:11' },
      { id: 'b3c4d', title: 'Wu-Tang Clan - C.R.E.A.M.', url: 'https://www.youtube.com/watch?v=PBwAxmrE194', imgUrl: 'https://i.ytimg.com/vi/PBwAxmrE194/mqdefault.jpg', addedAt: 1689945600, length: '4:12' },
      { id: 'e5f6g', title: 'The Notorious B.I.G. - Juicy', url: 'https://www.youtube.com/watch?v=_JZom_gVfuw', imgUrl: 'https://i.ytimg.com/vi/_JZom_gVfuw/mqdefault.jpg', addedAt: 1689945600, length: '5:02' },
      { id: 'h7i8j', title: 'Public Enemy - Fight The Power', url: 'https://www.youtube.com/watch?v=8PaoLy7PHwk', imgUrl: 'https://i.ytimg.com/vi/8PaoLy7PHwk/mqdefault.jpg', addedAt: 1689945600, length: '4:42' },
      { id: 'k9l0m', title: 'Eric B. & Rakim - Paid In Full', url: 'https://www.youtube.com/watch?v=0rZR6bz0Zbs', imgUrl: 'https://i.ytimg.com/vi/0rZR6bz0Zbs/mqdefault.jpg', addedAt: 1689945600, length: '3:49' },
    ],
  },
  {
    _id: 'l2m3n',
    name: 'Rap Radar',
    tags: ['Hip-Hop', 'Rap'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qcdqmpfwxs9b7xcds55m61%2F1753131482_img_0.webp?st=2025-07-21T19%3A12%3A05Z&se=2025-07-27T20%3A12%3A05Z&sks=b&skt=2025-07-21T19%3A12%3A05Z&ske=2025-07-27T20%3A12%3A05Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=rWEkeL9j9P%2FhodCfHgRcxLvwBBut4sz6lIeNkzfJiCQ%3D&az=oaivgprodscus',
    songs: [
      { id: 'n1o2p', title: 'Travis Scott - SICKO MODE', url: 'https://www.youtube.com/watch?v=6ONRf7h3Mdk', imgUrl: 'https://i.ytimg.com/vi/6ONRf7h3Mdk/mqdefault.jpg', addedAt: 1689945600, length: '5:12' },
      { id: 'q3r4s', title: 'Cardi B - Bodak Yellow', url: 'https://www.youtube.com/watch?v=PEGccV-NOm8', imgUrl: 'https://i.ytimg.com/vi/PEGccV-NOm8/mqdefault.jpg', addedAt: 1689945600, length: '3:44' },
      { id: 't5u6v', title: 'Post Malone - Congratulations', url: 'https://www.youtube.com/watch?v=SC4xMk98Pdc', imgUrl: 'https://i.ytimg.com/vi/SC4xMk98Pdc/mqdefault.jpg', addedAt: 1689945600, length: '3:40' },
      { id: 'w7x8y', title: 'Kanye West - Stronger', url: 'https://www.youtube.com/watch?v=PsO6ZnUZI0g', imgUrl: 'https://i.ytimg.com/vi/PsO6ZnUZI0g/mqdefault.jpg', addedAt: 1689945600, length: '5:11' },
      { id: 'z9a0b', title: 'Nicki Minaj - Super Bass', url: 'https://www.youtube.com/watch?v=4JipHEz53sU', imgUrl: 'https://i.ytimg.com/vi/4JipHEz53sU/mqdefault.jpg', addedAt: 1689945600, length: '3:20' },
    ],
  },
  {
    _id: 'm3n4o',
    name: 'Street Beats',
    tags: ['Hip-Hop', 'Trap'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0v8gkdhe528em0b1hdjvgy5%2F1753261625_img_1.webp?st=2025-07-23T07%3A23%3A17Z&se=2025-07-29T08%3A23%3A17Z&sks=b&skt=2025-07-23T07%3A23%3A17Z&ske=2025-07-29T08%3A23%3A17Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=ul7ra8VzKHQoys7VcJeWXs0COjeqJ%2BlSYetfUEwRNHw%3D&az=oaivgprodscus',
    songs: [
      { id: 'c1d2e', title: 'Future - Mask Off', url: 'https://www.youtube.com/watch?v=G2isf1DeYng', imgUrl: 'https://i.ytimg.com/vi/G2isf1DeYng/mqdefault.jpg', addedAt: 1689945600, length: '3:25' },
      { id: 'f3g4h', title: 'Migos - Bad and Boujee', url: 'https://www.youtube.com/watch?v=S-sJp1FfG7Q', imgUrl: 'https://i.ytimg.com/vi/S-sJp1FfG7Q/mqdefault.jpg', addedAt: 1689945600, length: '5:34' },
      { id: 'i5j6k', title: '21 Savage - Bank Account', url: 'https://www.youtube.com/watch?v=4qvAPWlcwes', imgUrl: 'https://i.ytimg.com/vi/4qvAPWlcwes/mqdefault.jpg', addedAt: 1689945600, length: '3:40' },
      { id: 'l7m8n', title: 'Lil Uzi Vert - XO Tour Llif3', url: 'https://www.youtube.com/watch?v=WrsFXgQk5UI', imgUrl: 'https://i.ytimg.com/vi/WrsFXgQk5UI/mqdefault.jpg', addedAt: 1689945600, length: '3:02' },
      { id: 'o9p0q', title: 'Travis Scott - Goosebumps', url: 'https://www.youtube.com/watch?v=Dst9Ge_Eh5c', imgUrl: 'https://i.ytimg.com/vi/Dst9Ge_Eh5c/mqdefault.jpg', addedAt: 1689945600, length: '4:03' },
    ],
  },

  // 5 Rock stations
  {
    _id: 'n4o5p',
    name: 'Classic Rockers',
    tags: ['Rock', 'Classic'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0v8kbrvef9am5vptdvjpfd6%2F1753261716_img_0.webp?st=2025-07-23T07%3A23%3A27Z&se=2025-07-29T08%3A23%3A27Z&sks=b&skt=2025-07-23T07%3A23%3A27Z&ske=2025-07-29T08%3A23%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=tHpI7F%2FwpAh%2FdHG%2FLGqz9ZmIyVH7bwMkWWzbFBsQO0g%3D&az=oaivgprodscus',
    songs: [
      { id: 'r1s2t', title: 'Led Zeppelin - Stairway to Heaven', url: 'https://www.youtube.com/watch?v=QkF3oxziUI4', imgUrl: 'https://i.ytimg.com/vi/QkF3oxziUI4/mqdefault.jpg', addedAt: 1689945600, length: '8:02' },
      { id: 'u3v4w', title: 'The Rolling Stones - Paint It Black', url: 'https://www.youtube.com/watch?v=O4irXQhgMqg', imgUrl: 'https://i.ytimg.com/vi/O4irXQhgMqg/mqdefault.jpg', addedAt: 1689945600, length: '3:45' },
      { id: 'x5y6z', title: 'Queen - Bohemian Rhapsody', url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ', imgUrl: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg', addedAt: 1689945600, length: '5:55' },
      { id: 'a7b8c', title: 'The Who - Baba O\'Riley', url: 'https://www.youtube.com/watch?v=x2KRpRMSu4g', imgUrl: 'https://i.ytimg.com/vi/x2KRpRMSu4g/mqdefault.jpg', addedAt: 1689945600, length: '5:00' },
      { id: 'd9e0f', title: 'Pink Floyd - Comfortably Numb', url: 'https://www.youtube.com/watch?v=_FrOQC-zEog', imgUrl: 'https://i.ytimg.com/vi/_FrOQC-zEog/mqdefault.jpg', addedAt: 1689945600, length: '6:22' },
    ],
  },
  {
    _id: 'o6p7q',
    name: 'Modern Rock Vibes',
    tags: ['Rock', 'Alternative'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0v8pnpye1gv272012jkvz0q%2F1753261816_img_0.webp?st=2025-07-23T07%3A23%3A17Z&se=2025-07-29T08%3A23%3A17Z&sks=b&skt=2025-07-23T07%3A23%3A17Z&ske=2025-07-29T08%3A23%3A17Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Yrq3qREEPkB6%2FYj8ag50l%2BRKLcSX5p%2F8fbgAyWUWqGM%3D&az=oaivgprodscus',
    songs: [
      { id: 'g1h2i', title: 'Imagine Dragons - Radioactive', url: 'https://www.youtube.com/watch?v=ktvTqknDobU', imgUrl: 'https://i.ytimg.com/vi/ktvTqknDobU/mqdefault.jpg', addedAt: 1689945600, length: '3:06' },
      { id: 'j3k4l', title: 'Foo Fighters - The Pretender', url: 'https://www.youtube.com/watch?v=SBjQ9tuuTJQ', imgUrl: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/mqdefault.jpg', addedAt: 1689945600, length: '4:27' },
      { id: 'm5n6o', title: 'Kings of Leon - Use Somebody', url: 'https://www.youtube.com/watch?v=SR6iYWJxHqs', imgUrl: 'https://i.ytimg.com/vi/SR6iYWJxHqs/mqdefault.jpg', addedAt: 1689945600, length: '3:51' },
      { id: 'p7q8r', title: 'The Killers - Mr. Brightside', url: 'https://www.youtube.com/watch?v=gGdGFtwCNBE', imgUrl: 'https://i.ytimg.com/vi/gGdGFtwCNBE/mqdefault.jpg', addedAt: 1689945600, length: '3:42' },
      { id: 's9t0u', title: 'Arctic Monkeys - Do I Wanna Know?', url: 'https://www.youtube.com/watch?v=bpOSxM0rNPM', imgUrl: 'https://i.ytimg.com/vi/bpOSxM0rNPM/mqdefault.jpg', addedAt: 1689945600, length: '4:32' },
    ],
  },
  {
    _id: 'r8s9t',
    name: 'Punk Rock Rebels',
    tags: ['Rock', 'Punk'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0v8s5n3fzhr7wb6hnc7mtyy%2F1753261900_img_1.webp?st=2025-07-23T08%3A17%3A13Z&se=2025-07-29T09%3A17%3A13Z&sks=b&skt=2025-07-23T08%3A17%3A13Z&ske=2025-07-29T09%3A17%3A13Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=BtCeXDPJeAxqikQxbOctOvxG3c2M6atWUlExbLD%2FWSs%3D&az=oaivgprodscus',
    songs: [
      { id: 'v1w2x', title: 'Green Day - Basket Case', url: 'https://www.youtube.com/watch?v=NUTGr5t3MoY', imgUrl: 'https://i.ytimg.com/vi/NUTGr5t3MoY/mqdefault.jpg', addedAt: 1689945600, length: '3:01' },
      { id: 'y3z4a', title: 'The Ramones - Blitzkrieg Bop', url: 'https://www.youtube.com/watch?v=MmB9b5njVbA', imgUrl: 'https://i.ytimg.com/vi/MmB9b5njVbA/mqdefault.jpg', addedAt: 1689945600, length: '2:12' },
      { id: 'b5c6d', title: 'The Offspring - Self Esteem', url: 'https://www.youtube.com/watch?v=LWYXSpU7O6w', imgUrl: 'https://i.ytimg.com/vi/LWYXSpU7O6w/mqdefault.jpg', addedAt: 1689945600, length: '4:17' },
      { id: 'e7f8g', title: 'Blink-182 - All The Small Things', url: 'https://www.youtube.com/watch?v=9Ht5RZpzPqw', imgUrl: 'https://i.ytimg.com/vi/9Ht5RZpzPqw/mqdefault.jpg', addedAt: 1689945600, length: '2:48' },
      { id: 'h9i0j', title: 'Bad Religion - American Jesus', url: 'https://www.youtube.com/watch?v=k4EbKb9UNuI', imgUrl: 'https://i.ytimg.com/vi/k4EbKb9UNuI/mqdefault.jpg', addedAt: 1689945600, length: '3:33' },
    ],
  },
  {
    _id: 'u1v2w',
    name: 'Indie Rock Showcase',
    tags: ['Rock', 'Indie'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0vam377eenaghazwjk2gtcr%2F1753263836_img_1.webp?st=2025-07-23T08%3A41%3A15Z&se=2025-07-29T09%3A41%3A15Z&sks=b&skt=2025-07-23T08%3A41%3A15Z&ske=2025-07-29T09%3A41%3A15Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=KHqVoFZ5RlbsnakzMpLf68uwvxEferLbEQPi1%2FPSEuo%3D&az=oaivgprodscus',
    songs: [
      { id: 'k1l2m', title: 'The Strokes - Last Nite', url: 'https://www.youtube.com/watch?v=TOypSnKFHrE', imgUrl: 'https://i.ytimg.com/vi/TOypSnKFHrE/mqdefault.jpg', addedAt: 1689945600, length: '3:13' },
      { id: 'n3o4p', title: 'Vampire Weekend - A-Punk', url: 'https://www.youtube.com/watch?v=J8W8Qb0l6mE', imgUrl: 'https://i.ytimg.com/vi/J8W8Qb0l6mE/mqdefault.jpg', addedAt: 1689945600, length: '2:17' },
      { id: 'q5r6s', title: 'Foster The People - Pumped Up Kicks', url: 'https://www.youtube.com/watch?v=SDTZ7iX4vTQ', imgUrl: 'https://i.ytimg.com/vi/SDTZ7iX4vTQ/mqdefault.jpg', addedAt: 1689945600, length: '3:59' },
      { id: 't7u8v', title: 'Arctic Monkeys - Fluorescent Adolescent', url: 'https://www.youtube.com/watch?v=ma9I9VBKPiw', imgUrl: 'https://i.ytimg.com/vi/ma9I9VBKPiw/mqdefault.jpg', addedAt: 1689945600, length: '2:57' },
      { id: 'w9x0y', title: 'Alt-J - Breezeblocks', url: 'https://www.youtube.com/watch?v=rVeMiVU77wo', imgUrl: 'https://i.ytimg.com/vi/rVeMiVU77wo/mqdefault.jpg', addedAt: 1689945600, length: '3:47' },
    ],
  },
  {
    _id: 'x3y4z',
    name: 'Hard Rock Hits',
    tags: ['Rock', 'Hard Rock'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0vap6q4eg9a6kwh5cf1b06j%2F1753263897_img_0.webp?st=2025-07-23T08%3A16%3A49Z&se=2025-07-29T09%3A16%3A49Z&sks=b&skt=2025-07-23T08%3A16%3A49Z&ske=2025-07-29T09%3A16%3A49Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=qndpNYiebUAE%2Fjx3RKXHtAUj9z9dSKpg8YM8CfKtqaQ%3D&az=oaivgprodscus',
    songs: [
      { id: 'z1a2b', title: 'AC/DC - Back In Black', url: 'https://www.youtube.com/watch?v=pAgnJDJN4VA', imgUrl: 'https://i.ytimg.com/vi/pAgnJDJN4VA/mqdefault.jpg', addedAt: 1689945600, length: '4:14' },
      { id: 'c3d4e', title: 'Guns N\' Roses - Sweet Child O\' Mine', url: 'https://www.youtube.com/watch?v=1w7OgIMMRc4', imgUrl: 'https://i.ytimg.com/vi/1w7OgIMMRc4/mqdefault.jpg', addedAt: 1689945600, length: '5:56' },
      { id: 'f5g6h', title: 'Metallica - Enter Sandman', url: 'https://www.youtube.com/watch?v=CD-E-LDc384', imgUrl: 'https://i.ytimg.com/vi/CD-E-LDc384/mqdefault.jpg', addedAt: 1689945600, length: '5:32' },
      { id: 'i7j8k', title: 'Nirvana - Smells Like Teen Spirit', url: 'https://www.youtube.com/watch?v=hTWKbfoikeg', imgUrl: 'https://i.ytimg.com/vi/hTWKbfoikeg/mqdefault.jpg', addedAt: 1689945600, length: '5:01' },
      { id: 'l9m0n', title: 'Deep Purple - Smoke On The Water', url: 'https://www.youtube.com/watch?v=zUwEIt9ez7M', imgUrl: 'https://i.ytimg.com/vi/zUwEIt9ez7M/mqdefault.jpg', addedAt: 1689945600, length: '5:40' },
    ],
  },
  {
    _id: 'y5z6a',
    name: 'Smooth R&B',
    tags: ['R&B', 'Soul'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0var5h0efss2mpnpfxsd390%2F1753263964_img_0.webp?st=2025-07-23T08%3A18%3A17Z&se=2025-07-29T09%3A18%3A17Z&sks=b&skt=2025-07-23T08%3A18%3A17Z&ske=2025-07-29T09%3A18%3A17Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=OVeVvd4V6uYusAsIjBzfiH0J6sWliYk%2B%2B%2FCLgtMAl%2Bk%3D&az=oaivgprodscus',
    songs: [
      { id: 'm1n2o', title: 'Alicia Keys - If I Ain\'t Got You', url: 'https://www.youtube.com/watch?v=Ju8Hr50Ckwk', imgUrl: 'https://i.ytimg.com/vi/Ju8Hr50Ckwk/mqdefault.jpg', addedAt: 1689945600, length: '3:48' },
      { id: 'p3q4r', title: 'John Legend - All of Me', url: 'https://www.youtube.com/watch?v=450p7goxZqg', imgUrl: 'https://i.ytimg.com/vi/450p7goxZqg/mqdefault.jpg', addedAt: 1689945600, length: '4:30' },
      { id: 's5t6u', title: 'Miguel - Adorn', url: 'https://www.youtube.com/watch?v=8D70DFuF6p8', imgUrl: 'https://i.ytimg.com/vi/8D70DFuF6p8/mqdefault.jpg', addedAt: 1689945600, length: '3:17' },
      { id: 'w7x8y', title: 'SZA - The Weekend', url: 'https://www.youtube.com/watch?v=6t1i-5bTeXM', imgUrl: 'https://i.ytimg.com/vi/6t1i-5bTeXM/mqdefault.jpg', addedAt: 1689945600, length: '4:32' },
      { id: 'z9a0b', title: 'Frank Ocean - Thinkin Bout You', url: 'https://www.youtube.com/watch?v=canIS43GvFU', imgUrl: 'https://i.ytimg.com/vi/canIS43GvFU/mqdefault.jpg', addedAt: 1689945600, length: '3:20' },
    ],
  },
  {
    _id: 'b6c7d',
    name: 'Neo-Soul Gems',
    tags: ['R&B', 'Neo-Soul'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0vatyzhfy1asqr8stghfgn0%2F1753264045_img_0.webp?st=2025-07-23T08%3A17%3A13Z&se=2025-07-29T09%3A17%3A13Z&sks=b&skt=2025-07-23T08%3A17%3A13Z&ske=2025-07-29T09%3A17%3A13Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=ZQ8up3j9eYQo%2Bo0nSVxihUDE5HK1d2%2BDBSgS1GqX%2BtI%3D&az=oaivgprodscus',
    songs: [
      { id: 'e1f2g', title: 'Erykah Badu - On & On', url: 'https://www.youtube.com/watch?v=VW3Lq6DeQUA', imgUrl: 'https://i.ytimg.com/vi/VW3Lq6DeQUA/mqdefault.jpg', addedAt: 1689945600, length: '4:54' },
      { id: 'h3i4j', title: 'D’Angelo - Untitled (How Does It Feel)', url: 'https://www.youtube.com/watch?v=HJf9v46hLhI', imgUrl: 'https://i.ytimg.com/vi/HJf9v46hLhI/mqdefault.jpg', addedAt: 1689945600, length: '6:46' },
      { id: 'k5l6m', title: 'Jill Scott - A Long Walk', url: 'https://www.youtube.com/watch?v=l2Q_k6r2UZ4', imgUrl: 'https://i.ytimg.com/vi/l2Q_k6r2UZ4/mqdefault.jpg', addedAt: 1689945600, length: '5:38' },
      { id: 'n7o8p', title: 'Lauryn Hill - Ex-Factor', url: 'https://www.youtube.com/watch?v=FFIqAguM06w', imgUrl: 'https://i.ytimg.com/vi/FFIqAguM06w/mqdefault.jpg', addedAt: 1689945600, length: '4:12' },
      { id: 'q9r0s', title: 'Maxwell - Ascension (Don\'t Ever Wonder)', url: 'https://www.youtube.com/watch?v=RUYlymdeWcw', imgUrl: 'https://i.ytimg.com/vi/RUYlymdeWcw/mqdefault.jpg', addedAt: 1689945600, length: '5:38' },
    ],
  },
  {
    _id: 'c8d9e',
    name: 'R&B Classics',
    tags: ['R&B', 'Classic'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0vaxha0ehfrcsh04ea59zw0%2F1753264132_img_1.webp?st=2025-07-23T08%3A20%3A11Z&se=2025-07-29T09%3A20%3A11Z&sks=b&skt=2025-07-23T08%3A20%3A11Z&ske=2025-07-29T09%3A20%3A11Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=pPbZVMsLxEIxbYkXFJYBD%2Flc%2BD24uI1FRusbUmHcM6A%3D&az=oaivgprodscus',
    songs: [
      { id: 't1u2v', title: 'Marvin Gaye - Let\'s Get It On', url: 'https://www.youtube.com/watch?v=x6QZn9xiuOE', imgUrl: 'https://i.ytimg.com/vi/x6QZn9xiuOE/mqdefault.jpg', addedAt: 1689945600, length: '4:05' },
      { id: 'w3x4y', title: 'Al Green - Let\'s Stay Together', url: 'https://www.youtube.com/watch?v=COiIC3A0ROM', imgUrl: 'https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg', addedAt: 1689945600, length: '3:18' },
      { id: 'z5a6b', title: 'Otis Redding - (Sittin\' On) The Dock of the Bay', url: 'https://www.youtube.com/watch?v=rTVjnBo96Ug', imgUrl: 'https://i.ytimg.com/vi/rTVjnBo96Ug/mqdefault.jpg', addedAt: 1689945600, length: '2:43' },
      { id: 'c7d8e', title: 'Aretha Franklin - Respect', url: 'https://www.youtube.com/watch?v=6FOUqQt3Kg0', imgUrl: 'https://i.ytimg.com/vi/6FOUqQt3Kg0/mqdefault.jpg', addedAt: 1689945600, length: '2:28' },
      { id: 'f9g0h', title: 'Stevie Wonder - Superstition', url: 'https://www.youtube.com/watch?v=0CFuCYNx-1g', imgUrl: 'https://i.ytimg.com/vi/0CFuCYNx-1g/mqdefault.jpg', addedAt: 1689945600, length: '4:26' },
    ],
  },
  {
    _id: 'd1e2f',
    name: 'Contemporary R&B',
    tags: ['R&B', 'Contemporary'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0vazyjde77becrr6w7mzhhp%2F1753264212_img_0.webp?st=2025-07-23T07%3A56%3A43Z&se=2025-07-29T08%3A56%3A43Z&sks=b&skt=2025-07-23T07%3A56%3A43Z&ske=2025-07-29T08%3A56%3A43Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=C%2B6YeRssRmg1lo0f7uIMVmceeCLxa0KGyYmL7eyRoN0%3D&az=oaivgprodscus',
    songs: [
      { id: 'i1j2k', title: 'Bruno Mars - That’s What I Like', url: 'https://www.youtube.com/watch?v=PMivT7MJ41M', imgUrl: 'https://i.ytimg.com/vi/PMivT7MJ41M/mqdefault.jpg', addedAt: 1689945600, length: '3:26' },
      { id: 'l3m4n', title: 'The Weeknd - Blinding Lights', url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ', imgUrl: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/mqdefault.jpg', addedAt: 1689945600, length: '3:20' },
      { id: 'o5p6q', title: 'H.E.R. - Focus', url: 'https://www.youtube.com/watch?v=7FVYDnd5oZs', imgUrl: 'https://i.ytimg.com/vi/7FVYDnd5oZs/mqdefault.jpg', addedAt: 1689945600, length: '4:15' },
      { id: 'r7s8t', title: 'Daniel Caesar - Get You', url: 'https://www.youtube.com/watch?v=Az2Fn4gPr2E', imgUrl: 'https://i.ytimg.com/vi/Az2Fn4gPr2E/mqdefault.jpg', addedAt: 1689945600, length: '4:43' },
      { id: 'u9v0w', title: 'Snoh Aalegra - I Want You Around', url: 'https://www.youtube.com/watch?v=LWWc_6w9IjI', imgUrl: 'https://i.ytimg.com/vi/LWWc_6w9IjI/mqdefault.jpg', addedAt: 1689945600, length: '3:25' },
    ],
  },
  {
    _id: 'e3f4g',
    name: 'R&B Grooves',
    tags: ['R&B', 'Groove'],
    addedBy: 'StationOne',
    thumbnail:'https://videos.openai.com/vg-assets/assets%2Ftask_01k0vb2kq0ecdbfbfzrzsg87wg%2F1753264304_img_0.webp?st=2025-07-23T08%3A20%3A11Z&se=2025-07-29T09%3A20%3A11Z&sks=b&skt=2025-07-23T08%3A20%3A11Z&ske=2025-07-29T09%3A20%3A11Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=88oHSPt6LbwYJhFhR2HmVOUDBVjm5p9Z4Wg6N1uS8%2FQ%3D&az=oaivgprodscus',
    songs: [
      { id: 'x1y2z', title: 'TLC - No Scrubs', url: 'https://www.youtube.com/watch?v=FrLequ6dUdM', imgUrl: 'https://i.ytimg.com/vi/FrLequ6dUdM/mqdefault.jpg', addedAt: 1689945600, length: '3:39' },
      { id: 'a3b4c', title: 'Beyoncé - Crazy In Love', url: 'https://www.youtube.com/watch?v=ViwtNLUqkMY', imgUrl: 'https://i.ytimg.com/vi/ViwtNLUqkMY/mqdefault.jpg', addedAt: 1689945600, length: '3:56' },
      { id: 'd5e6f', title: 'Usher - Yeah!', url: 'https://www.youtube.com/watch?v=GxBSyx85Kp8', imgUrl: 'https://i.ytimg.com/vi/GxBSyx85Kp8/mqdefault.jpg', addedAt: 1689945600, length: '4:10' },
      { id: 'g7h8i', title: 'Ne-Yo - Because of You', url: 'https://www.youtube.com/watch?v=ZcGdCzAyb2E', imgUrl: 'https://i.ytimg.com/vi/ZcGdCzAyb2E/mqdefault.jpg', addedAt: 1689945600, length: '4:27' },
      { id: 'j9k0l', title: 'Mary J. Blige - Family Affair', url: 'https://www.youtube.com/watch?v=KQfAl6q6LE0', imgUrl: 'https://i.ytimg.com/vi/KQfAl6q6LE0/mqdefault.jpg', addedAt: 1689945600, length: '4:00' },
    ],
  },
  {
    _id: 'a1b2c',
    name: 'Funky Monks',
    tags: ['Funk', 'Happy'],
    addedBy: 'StationOne',
    thumbnail: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k0qb8qdpfvzbb9s7bhrx46sh%2F1753130256_img_0.webp?st=2025-07-21T20%3A05%3A28Z&se=2025-07-27T21%3A05%3A28Z&sks=b&skt=2025-07-21T20%3A05%3A28Z&ske=2025-07-27T21%3A05%3A28Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=%2Bxj%2BmpQ3%2FG52Uo8%2Bj0DyG0dyfbiK0w7MeqNYBmizvds%3D&az=oaivgprodscus',
    songs: [
      { id: 'f1g2h', title: 'The Meters - Cissy Strut', url: 'https://www.youtube.com/watch?v=4_iC0MyIykM&list=RD4_iC0MyIykM', imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg', addedAt: 1689945600, length: '4:13' },
      { id: 'j3k4l', title: "The JB's - Pass The Peas", url: 'https://www.youtube.com/watch?v=mUkfiLjooxs&list=RDmUkfiLjooxs', imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg', addedAt: 1689945600, length: '3:30' },
      { id: 'm5n6o', title: 'James Brown - Get Up Offa That Thing', url: 'https://www.youtube.com/watch?v=6AMu9Ceb6U8', imgUrl: 'https://i.ytimg.com/vi/6AMu9Ceb6U8/mqdefault.jpg', addedAt: 1689945600, length: '5:13' },
      { id: 'p7q8r', title: 'Stevie Wonder - Superstition', url: 'https://www.youtube.com/watch?v=0CFuCYNx-1g', imgUrl: 'https://i.ytimg.com/vi/0CFuCYNx-1g/mqdefault.jpg', addedAt: 1689945600, length: '4:26' },
      { id: 's9t0u', title: 'Curtis Mayfield - Move On Up', url: 'https://www.youtube.com/watch?v=ZCLp4mep3l4', imgUrl: 'https://i.ytimg.com/vi/ZCLp4mep3l4/mqdefault.jpg', addedAt: 1689945600, length: '7:00' },
    ],
  }
]