import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { editStation } from "../../store/station.actions"
import SvgIcon from "../SvgIcon"
import { uploadService } from "../../services/upload.service.js"

export function StationEdit() {
  const user = useSelector(state => state.userModule.user)
  const stations = useSelector(state => state.stationModule)
  const [stationName, setStationName] = useState(stations.selectedStation?.name)
  const [stationDesc, setStationDesc] = useState(stations.selectedStation?.desc ? stations.selectedStation.desc : '')
  const fileInputRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(stations.selectedStation?.thumbnail)
  const [imgData, setImgData] = useState({
    imgUrl: stations.selectedStation?.thumbnail,
    height: 500,
    width: 500,
  })

  const [isUploading, setIsUploading] = useState(false)


  useEffect(() => {
    setStationName(stations.selectedStation?.name)
    setStationDesc(stations.selectedStation?.desc ? stations.selectedStation.desc : '')
    setImageUrl(stations.selectedStation?.thumbnail)
  }, [stations.selectedStation._id])

  function handleImageClick() {
    console.log("clicked")
    fileInputRef.current.click()
  }

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    console.log(secure_url)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }

  function onUploaded(imgUrl) {
        setImageUrl(imgUrl)
    }

  async function saveNewDetails() {
    var changes = {}
    if (!(stationName === stations.selectedStation.name)) changes.name = stationName
    if (!(stationDesc === stations.selectedStation.desc)) changes.desc = stationDesc
    if (!(imageUrl === stations.selectedStation?.thumbnail)) changes.thumbnail = imageUrl

    if (changes.name || changes.desc || changes.thumbnail) {
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
          <button className="close-btn"><SvgIcon iconName={'closeModal'} /></button>
        </div>
        <div className="edit-station-fields">
          <img src={imageUrl} onClick={() => handleImageClick()} />
          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={uploadImg} accept="img/*" id="imgUpload" />
          <input className="station-title-input" placeholder="Add a name" value={stationName} onChange={(e) => setStationName(e.target.value)}></input>
          <textarea className="station-desc-input" placeholder="Add an optional description" value={stationDesc} onChange={(e) => setStationDesc(e.target.value)}></textarea>
          <button className="save-btn" onClick={() => saveNewDetails()}>Save</button>
          <p className="disclaimer">By proceeding, you agree to give StationOne access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
        </div>
      </div>
    </div>
  )
}
