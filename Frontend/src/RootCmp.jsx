import { Routes, Route, Navigate } from 'react-router'
import { useState, useEffect } from "react"

import { HomePage } from './pages/HomePage'
import { Browse } from './pages/Browse.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { StationPreview } from './pages/StationPreview.jsx'
import { SearchResultsPage } from './pages/SearchResultsPage.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { LibraryBar } from './cmps/LibraryBarCmps/LibraryBar.jsx'
import { GlobalModal } from './cmps/GlobalModal.jsx'
import { StationOneLogin } from './pages/StationOneLogin.jsx'


export function RootCmp() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('userDB')
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    function handleLogin(userData) {
        setUser(userData)
    }
    return (
        <>
            {user ? (
                <div className="main-container">
                    <div className="main-header"><AppHeader /></div>
                    <div className="main-librarybar"><LibraryBar /></div>
                    <div className="main-content">
                        <Routes>
                            <Route path="/StationOne/" element={<HomePage />} />
                            <Route path="/StationOne/search" element={<Browse />} />
                            <Route path="/StationOne/search/:searchParams" element={<SearchResultsPage />} />
                            <Route path="/StationOne/station/:stationId" element={<StationPreview />} />
                            <Route path="/StationOne/playlist/:playlistId" element={<StationPreview />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <div className="main-footer"><AppFooter /></div>
                    <GlobalModal />
                </div>
            ) : (
                <div className="user-login-prompt">
                    <StationOneLogin onLogin={handleLogin} />
                </div>
            )}
        </>
    )
}
