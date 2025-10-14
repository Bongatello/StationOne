import { NavLink, useLocation } from "react-router-dom"
import { MobileAudioPlayer } from "./MobileAudioPlayer"
import SvgIcon from "./SvgIcon"


export function AppMobileFooter() {
    const location = useLocation()


    return (
        <div className="app-mobile-footer">
            <div><MobileAudioPlayer /></div>
            <div className="mobile-footer-links">
                <NavLink to={`/StationOne/`}>
                    <div className={`footer-link ${location.pathname === "/StationOne/" ? "footer-link-active" : "footer-link-home-passive"}`}>
                        <SvgIcon iconName={"homeLogoSVG"} />
                        <p>Home</p>
                    </div>
                </NavLink>
                <NavLink to={`/StationOne/mobile-search`}>
                    <div className={`footer-link ${location.pathname === "/StationOne/mobile-search" ? "footer-link-active" : "footer-link-passive"}`}>
                        <SvgIcon iconName={"headerSearchSVG"} />
                        <p>Search</p>
                    </div>
                </NavLink>
                <NavLink to={`/StationOne/library`}>
                    <div className={`footer-link ${location.pathname === "/StationOne/library" ? "footer-link-active" : "footer-link-passive"}`}>
                        <SvgIcon iconName={"libraryIconSVG"} />
                        <p>Your Library</p>
                    </div>
                </NavLink>
                <button className={`footer-link footer-link-active"`}>
                    <SvgIcon iconName={"plusCreateButtonSVG"} />
                    <p>Create</p>
                </button>
            </div>
        </div>
    )
}