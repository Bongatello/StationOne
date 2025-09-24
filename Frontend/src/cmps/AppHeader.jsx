import { Link, NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import SvgIcon from './SvgIcon'
import { useState } from 'react'

export function AppHeader() {
    const location = useLocation()
    const [searchValue, setSearchValue] = useState('')


    return (
        <header className="app-header">
            <nav className=''>
                <NavLink to="/StationOne/" className="/logo">
                    <img src='/StationOne/img/sologo.png' />
                </NavLink>

                <div className="header-middle">
                    <NavLink to="/StationOne/">
                        <div className={location.pathname === "/StationOne/" ? "home-logo-wrapper when-home" : "home-logo-wrapper when-not-home"}>
                            <SvgIcon iconName={"homeLogoSVG"} />
                        </div>
                    </NavLink>

                    <div className="search-bar">
                        <NavLink to={`/StationOne/search/${searchValue}`} className="search-link">
                            <SvgIcon iconName={"headerSearchSVG"} />
                        </NavLink>

                        <input type="text" placeholder="What do you want to play?" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>

                        <NavLink to="/StationOne/search">
                            {(location.pathname === "/StationOne/search") &&
                                <div className="explore-link explore-active">
                                    <SvgIcon iconName={"headerBrowseActiveSVG"} />
                                </div>
                            }
                            {!(location.pathname === "/StationOne/search") &&
                                <div className="explore-link explore-default">
                                    <SvgIcon iconName={"headerBrowseInactiveSVG"} />
                                </div>
                            }
                        </NavLink>
                    </div>
                </div>
                <p>U</p>
            </nav>
        </header >
    )
}
