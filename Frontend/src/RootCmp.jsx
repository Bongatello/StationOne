import { Routes, Route, Outlet } from 'react-router'
import { useState, useEffect, useRef } from "react"

import { HomePage } from './pages/HomePage'
import { Browse } from './pages/Browse.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { StationPreview } from './pages/StationPreview.jsx'
import { SearchResultsPage } from './pages/SearchResultsPage.jsx'
import { StationOneLogin } from './pages/StationOneLogin.jsx'
import { MobileLibrary } from './pages/MobileLibrary.jsx'
import { MobileSearch } from './pages/MobileSearch.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppDesktopFooter } from './cmps/AppDesktopFooter'
import { LibraryBar } from './cmps/LibraryBarCmps/LibraryBar.jsx'
import { GlobalModal } from './cmps/GlobalModal.jsx'
import { AppMobileFooter } from './cmps/AppMobileFooter.jsx'

export function RootCmp() {
    const [user, setUser] = useState(null)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const fullScreenPlayer = useRef(false)

    useEffect(() => {
        const storedUser = localStorage.getItem('userDB')
        if (storedUser) setUser(JSON.parse(storedUser))
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function handleFullScreenMediaChange(ev) {
        console.log(fullScreenPlayer.current)
        fullScreenPlayer.current = !fullScreenPlayer.current
        
        /* if (ev.target.classList.contains("main-fullscreen-mobile-player")) console.log('yes') */
    }

    function handleResize() {
        const newIsMobile = window.innerWidth < 768
        setIsMobile(prev => (prev !== newIsMobile ? newIsMobile : prev))
    }

    function handleLogin(userData) {
        setUser(userData)
    }

    function MainLayout() {
        return (
            <div className="main-container">
                <div className="main-header"><AppHeader /></div>
                <div className="main-librarybar"><LibraryBar /></div>
                <div className="main-content">
                    <Outlet />
                </div>
                {!isMobile && <div className="main-desktop-footer"><AppDesktopFooter /></div>}
                {isMobile && <div className={fullScreenPlayer.current ? "main-fullscreen-mobile-player" : "main-mobile-footer"} onClick={(ev) => handleFullScreenMediaChange(ev)}><AppMobileFooter /></div>}
                <GlobalModal />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="user-login-prompt">
                <StationOneLogin onLogin={handleLogin} />
            </div>
        )
    }

    return (
        <Routes>
            {/* Layout routes (with header, footers, etc.) */}
            <Route element={<MainLayout />}>
                <Route path="/StationOne/" element={<HomePage />} />
                <Route path="/StationOne/search" element={<Browse />} />
                <Route path="/StationOne/search/:searchParams" element={<SearchResultsPage />} />
                <Route path="/StationOne/station/:stationId" element={<StationPreview />} />
                <Route path="/StationOne/playlist/:playlistId" element={<StationPreview />} />
                <Route path="/StationOne/album/:albumId" element={<StationPreview />} />
                <Route path="/StationOne/library" element={<MobileLibrary />} />
                <Route path="/StationOne/mobile-search" element={<MobileSearch />} />
            </Route>

            {/* Fullscreen mediaplayer route (witout main layout) */}
            <Route path="/StationOne/mediaplayer" element={<Browse />} /> {/* Maybe wont be required? Thinking about another way to make the mediaplayer expand into fullscreen */}

            {/* Catch other routes */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}