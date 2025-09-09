import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user/user.service.js'
import { StationsLibraryList } from './StationsLibraryList.jsx'
import { loadUser } from '../store/user.actions.js'
import SvgIcon from './SvgIcon.jsx'


export function LibraryBar() {
	const userData = useSelector(state => state.userModule.user)

	useEffect(() => {
		loadUser('68bd55e48bcc464f50c11920')
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
					<SvgIcon iconName={"plusCreateButtonSVG"} />

					<h1>Create</h1>
				</button>
			</div>

			{userData.likedStations.map(station => <StationsLibraryList station={station}/>)}


        </div>
    )
}
