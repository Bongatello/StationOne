import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { userService } from './services/user'
import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'





import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { LibraryBar } from './cmps/LibraryBar.jsx'

import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { Browse } from './pages/Browse.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <div className="main-header"><AppHeader /></div>
            <div className="main-librarybar"><LibraryBar /></div>
                <div className="main-content">
                    <Routes>
                        <Route path="/StationOne/" element={<HomePage />} />
                        <Route path="/StationOne/search" element={<Browse/>}/>
                        <Route path="user/:id" element={<UserDetails />} />

                        <Route path="login" element={<LoginSignup />}>
                            <Route index element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                        </Route>
                    </Routes>
                </div>
    
            <div className="main-footer"><AppFooter /></div>
        </div>
    )
}
