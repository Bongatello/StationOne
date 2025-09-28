import { useState } from 'react'

export function StationOneLogin({ onLogin }) {
  const [selectedUserId, setSelectedUserId] = useState('68d7c7d1808badfa56070d4e')

  const handleLogin = () => {
    // Save selected userId to localStorage
    localStorage.setItem('userDB', JSON.stringify({ userId: selectedUserId }))
    if (onLogin) onLogin({ _id: selectedUserId }) // notify RootCmp
  }

  return (
    <div className="login-page">
      <h1>StationOne</h1>
      <img src="station_one_logo.png" alt="Station One Logo" />
      <h2>Hello! Please log in to your account:</h2>

      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="68d7c7d1808badfa56070d4e">User 1</option>
        <option value="68bb2208d5ea1ed6ddb82b4a">User 2</option>
      </select>

      <button onClick={() => handleLogin}>Confirm</button>
    </div>
  )
}