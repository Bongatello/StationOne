import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header">
            <nav className=''>
                
                <NavLink to="/" className="/logo"><img src='../../img/StationOneLogo.png' onerror="this.onerror=null; this.src='../../dist/img/StationOneLogo.png';"/></NavLink>

                <div className="header-middle">

                    <NavLink to="/"><img src='../../img/home.svg' onerror="this.onerror=null; this.src='../../dist/img/home.svg';"/></NavLink>


                    <div className="search-bar">
                        <NavLink to="/search/searchparams" className="search-link">
                            <img src='../../img/search.svg' onerror="this.onerror=null; this.src='../../dist/img/search.svg';" className="colored-svg"/>
                        </NavLink>

                        <input type="text" placeholder="What do you want to play?"/>

                        <NavLink to="/search" className="explore-link">
                            <img src='../../img/explore.png' onerror="this.onerror=null; this.src='../../dist/img/explore.png';"/>
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
