import React from 'react'
import { Routes, Route, Navigate } from 'react-router'


import { HomePage } from './pages/HomePage'
import { Browse } from './pages/Browse.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { StationPreview } from './pages/StationPreview.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { LibraryBar } from './cmps/LibraryBar.jsx'


export function RootCmp() {
    return (

        <div className="main-container">
            <div className="main-header"><AppHeader /></div>
            <div className="main-librarybar"><LibraryBar /></div>
            <div className="main-content">
                <Routes>
                    <Route path="/StationOne/" element={<HomePage />} />
                    <Route path="/StationOne/search" element={<Browse />} />
                    <Route path="/StationOne/station/:stationId" element={<StationPreview/>} />
                    <Route path="/StationOne/playlist/:playlistId" element={<StationPreview/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>

            <div className="main-footer"><AppFooter /></div>
        </div>

    )
}
