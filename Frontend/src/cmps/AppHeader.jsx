import { Link, NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user) //will use to get image
    const navigate = useNavigate()
    const location = useLocation()

    const svgProps = {height:"24px", width:"24px", viewBox:"0 0 24 24"}
    const homeLogo = "M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z"
    const searchLogo = "M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"
    const exploreActive = "M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333s-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5s1.567 2.333 3.5 2.333z"
    const exploreDefault1 = "M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2"
    const exploreDefault2 = "M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4z"


    const homeClass = location.pathname === "/StationOne/" ? "when-home" : "when-not-home"

    function isExplorePage(loc){
        if (loc.pathname === "/StationOne/search") 
            return (
            <svg className="explore-link explore-active" {...svgProps}>
                <path d={exploreActive}/>
            </svg>
            )
        

        return (
        <svg className="explore-link explore-default" {...svgProps}>
            <path d={exploreDefault1}/>
            <path d={exploreDefault2}/>
        </svg>
        )
    }

    return (
        <header className="app-header">
            <nav className=''>
                
                <NavLink to="/StationOne/" className="/logo">
                    <img src='../../img/StationOneLogo.png'/>
                </NavLink>

                <div className="header-middle">

                    <NavLink to="/StationOne/">
                        <div className="home-logo-wrapper">
                            <svg className={homeClass} height="24px" width="24px" viewBox="0 0 24 24">
                                <path d={homeLogo}/>
                            </svg>
                        </div>
                    </NavLink>


                    <div className="search-bar">
                        <NavLink to="/StationOne/search/searchparams" className="search-link">
                            <svg {...svgProps}>
                                <path d={searchLogo}/>
                            </svg>
                        </NavLink>

                        <input type="text" placeholder="What do you want to play?"/>

                        <NavLink to="/StationOne/search" className="explore-link">
                            {isExplorePage(location)}
                        </NavLink>
                    </div>

                </div>

                {!user && <NavLink to="login" className="login-link">Login</NavLink>}

                {user && (
                    <div className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <button onClick={onLogout}>logout</button>
                    </div>
                )}
            </nav>
        </header >
    )
}
