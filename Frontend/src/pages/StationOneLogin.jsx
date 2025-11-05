import { useState, useRef } from 'react'
import { authService } from '../services/auth.service.js'

export function StationOneLogin({ onLogin }) {
  const emptyUser = {
    username: '',
    password: '',
  }

  const [selectedUserId, setSelectedUserId] = useState('68d7c7d1808badfa56070d4e')
  const [isSignUp, setIsSignUp] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = (userId) => {
    // Save selected userId to localStorage
    localStorage.setItem('userDB', JSON.stringify({userId: userId._id}))
  }

  const onSubmitForm = async (ev) => {
    ev.preventDefault()
    if (!username || !password) return

    const userCreds = { username: username, password: password }

    setErrorMsg('')
    try {
      var userId
      if (isSignUp === true) userId = await authService.authSignup(userCreds)
      else if (isSignUp === false) userId = await authService.authLogin(userCreds)
      console.log('UID: ', userId)
      handleLogin(userId)
      window.location.reload()
    } catch (err) {
      console.log('There was an error submitting login form, Please re-try, ', err)
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message)
      } else if (err.response?.data) {
        setErrorMsg(err.response.data)
      } else {
        setErrorMsg('Login failed. Please try again.')
      }
    }
  }

  return (
    <div className="login-page">
      <div className='login-page-header'>
        <h1>StationOne</h1>
        <img src="https://res.cloudinary.com/dszyainah/image/upload/v1758998253/mujg4jvm45wugenrzbpp.png" alt="Station One Logo" height={'64px'} />
      </div>

      <h2>Hello there!</h2>
      <p>I will be using this page for user authentication and first-time explanation,</p>
      <p>So for now, playlist creation should work perfectly fine, with thumbnail setting automatically to first song added, unless all songs have been deleted which returns it into a blank thumbnail</p>
      <p>Searching for playlists/songs/albums etc. on the search bar, on the top of the page works, including showcase and play,pause,skip functionality on both playlist and albums</p>
      <p>The pre-made playlists you will come across are spotify-user-made playlists</p>
      <p>Home page should include your recent played playlists, id guess its still broken for albums right now, will work on a fix later on</p>
      <p>Library-bar should also work except for the sorting methods, which would be worked on later</p>
      <p>So for now the library-bar is for saved/liked/created playlists and playlist creation only</p>
      <p>Listening with friends is a little tricky for now, will make it much more user friendly later on, but contact me if you want to try it out</p>
      <p>Explore/Browse page is kinda impossible to re-create unless its genres/collections are hard-coded because spotify doesnt share any data about it</p>
      <p>Also since we don't really have the collections or genres, the homepage genres are hard coded but the playlists shown are actually user-made through spotify, and being fetched from the spotify api</p>
      <p>Dragging and dropping will be a more "advanced" feature, just feels kind-of useless right now even though it sounds complicated and cool</p>
      <p>Liking songs and liked songs is not a feature right now</p>

      <div className='login-page-existing'>

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="68d7c7d1808badfa56070d4e">User 1</option>
          <option value="68bb2208d5ea1ed6ddb82b4a">User 2</option>
        </select>

        <button onClick={() => handleLogin()}>Confirm</button>
      </div>
      <div className='login-signup-switch'>
        <label class="switch">
          <input type="checkbox" value={isSignUp} onChange={() => setIsSignUp(!isSignUp)} />
          <span class="slider round"></span>
        </label>
        <p>Already a member?</p>
      </div>
      <form className='login-page-create' onSubmit={(ev) => onSubmitForm(ev)}>
        <input placeholder='Username' onChange={(ev) => setUsername(ev.target.value)} value={username} />
        <input placeholder='Password' onChange={(ev) => setPassword(ev.target.value)} value={password} type="password" />
        {errorMsg && <div style={{color: 'red', marginTop: '10px'}}>{errorMsg}</div>}
        <button>{isSignUp ? 'Sign-up' : 'Log-in'}</button>
      </form>
    </div>
  )
}