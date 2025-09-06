import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { stationService } from '../services/station/station.service.js'
import { userService } from '../services/user/user.service.js'
import { StationsLibraryList } from './StationsLibraryList.jsx'
import { loadUser } from '../store/user.actions.js'


export function LibraryBar() {
	const userData = useSelector(state => state.userModule.user)


	useEffect(() => {
		loadUser('68bb2208d5ea1ed6ddb82b4a')
	}, [userData.likedStations.length])

	async function addNewUserStation(){
		await userService.addStation()
	}

    
	if (userData === undefined) {
		return (
			<div>Stations Loading...</div>
		)
	}
    return (
        <div className="library-bar">
			<div className="header-create-wrapper">
				<h1>Your Library</h1>
            	<button className="create" onClick={addNewUserStation}>
					<svg height='16px' width='16px' viewBox="0 0 16 16">
						<path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"/>
					</svg> 

					<h1>Create</h1>
				</button>
			</div>

			{userData.likedStations.map(station => <StationsLibraryList station={station}/>)}


        </div>
    )
}
