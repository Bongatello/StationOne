import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { editStation } from "../../store/station.actions"


export function StationEdit() {
  const user = useSelector(state => state.userModule.user)
  const stations = useSelector(state => state.stationModule)
  const [stationName, setStationName] = useState(stations.selectedStation?.name)
  const [stationDesc, setStationDesc] = useState(stations.selectedStation?.desc ? stations.selectedStation.desc : '')

  useEffect(() => {
    setStationName(stations.selectedStation?.name)
    setStationDesc(stations.selectedStation?.desc ? stations.selectedStation.desc : '')
  }, [stations.selectedStation._id])

  async function saveNewDetails() {
    var changes = {}
    if (!(stationName === stations.selectedStation.name)) changes.name = stationName
    if (!(stationDesc === stations.selectedStation.desc)) changes.desc = stationDesc
    //if (new image) changes.thumbnail = new image

    if (changes.name || changes.desc) {
      console.log('Station Changes: ', changes)
      changes._id = stations.selectedStation._id
      await editStation(changes, user)
    }
  }

  return (
    <div className="modal-screen">
      <div className="edit-station-box">
        <div className="header-close-btn">
          <h2 onClick={() => console.log('hello from modal: ', stations)}>Edit details</h2>
          <button className="close-btn">X</button>
        </div>
        <div className="edit-station-fields">
          <img src={stations.selectedStation?.thumbnail} onClick={console.log('Pretend this opens up cloudinary image input and onupload, it overwrites station.thumbnail')} />
          <input className="station-title-input" placeholder="Add a name" value={stationName} onChange={(e) => setStationName(e.target.value)}></input>
          <textarea className="station-desc-input" placeholder="Add an optional description" value={stationDesc} onChange={(e) => setStationDesc(e.target.value)}></textarea>
          <button className="save-btn" onClick={() => saveNewDetails()}>Save</button>
          <p className="disclaimer">By proceeding, you agree to give StationOne access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
        </div>
      </div>
    </div>
  )
}
