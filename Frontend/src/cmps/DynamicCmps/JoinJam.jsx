import { useState } from "react"
import SvgIcon from "../SvgIcon"
import { socket } from "../../services/socket.service.js"

export function JoinJam() {
    const [roomId, setRoomId] = useState('')

    function joinJamRoom() {
        socket.emit('join-room', roomId)
    }

    return (
        <div className="modal-screen">
            <div className="join-jam-box">
                <div className="header-close-btn">
                    <h2 onClick={() => console.log('hello from modal')}>Join a Jam</h2>
                    <button className="close-btn"><SvgIcon iconName={'closeModal'} /></button>
                </div>
                <div className="join-jam-fields">
                    <input type="text" className="room-id-input" placeholder="type in roomId and press join" value={roomId} onChange={(ev) => setRoomId(ev.target.value)}></input>
                    <button className="save-btn" onClick={() => joinJamRoom()}>Join</button>
                </div>
            </div>
        </div>
    )
}