import { NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import SvgIcon from './SvgIcon'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { removeFromStorage } from '../services/util.service.js'

export function AppHeader() {
    const location = useLocation()
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const [hoveringExplore, setHoveringExplore] = useState(false)
    const user = useSelector(state => state.userModule.user)

    function handleLogout() {

    }


    return (
        <header className="app-header">
            <nav className=''>
                <NavLink to="/StationOne/" className="/logo">
                    <img src='https://res.cloudinary.com/dszyainah/image/upload/v1758998253/mujg4jvm45wugenrzbpp.png' />
                </NavLink>

                <div className="header-middle">
                    <NavLink to="/StationOne/">
                        <div className={location.pathname === "/StationOne/" ? "home-logo-wrapper when-home" : "home-logo-wrapper when-not-home"}>
                            <SvgIcon iconName={"homeLogoSVG"} />
                        </div>
                    </NavLink>

                    <div className="search-bar">
                        <NavLink to={`/StationOne/search/${searchValue}`} className="search-link" onMouseEnter={() => setHoveringExplore(true)} onMouseLeave={() => setHoveringExplore(false)}>
                            <SvgIcon iconName={"headerSearchSVG"} />
                        </NavLink>

                        <input type="text"
                            placeholder="What do you want to play?"
                            value={searchValue}
                            onChange={(ev) => setSearchValue(ev.target.value)}
                            onKeyDown={(ev) => { if (ev.key === "Enter") { navigate(`/StationOne/search/${searchValue}`) } }}
                            style={{
                                backgroundColor: hoveringExplore ? "#282828" : "#1f1f1f",
                                borderColor: hoveringExplore ? "#b3b3b3" : "#1f1f1f"
                            }}
                            onMouseEnter={() => setHoveringExplore(true)}
                            onMouseLeave={() => setHoveringExplore(false)}
                        />

                        <NavLink to="/StationOne/search">
                            {(location.pathname === "/StationOne/search") &&
                                <div className="explore-link explore-active"
                                    onMouseEnter={() => setHoveringExplore(true)}
                                    onMouseLeave={() => setHoveringExplore(false)}
                                >
                                    <SvgIcon iconName={"headerBrowseActiveSVG"} />
                                </div>
                            }
                            {!(location.pathname === "/StationOne/search") &&
                                <div className="explore-link explore-default"
                                    onMouseEnter={() => setHoveringExplore(true)}
                                    onMouseLeave={() => setHoveringExplore(false)}
                                >
                                    <SvgIcon iconName={"headerBrowseInactiveSVG"} />
                                </div>
                            }
                        </NavLink>
                    </div>
                </div>
                <div className='user-logo-header-wrapper'>
                    <div className='user-logo-header' onClick={() => {
                        removeFromStorage('userDB', 'userId')
                        window.location.href = '/StationOne/'
                        }}>
                        <p>{user.name?.charAt(0)}</p>
                    </div>
                </div>
            </nav>
        </header >
    )
}
