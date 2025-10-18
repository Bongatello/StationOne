import SvgIcon from '../cmps/SvgIcon.jsx'



export function MobileSearch () {


    return(
        <div className="mobile-search-page">
            <div className="search-bar-wrapper">
                <h1>Search</h1>
                <div className="search-bar-input">
                    <SvgIcon iconName={"headerSearchSVG"} />
                    <input placeholder='What do you want to listen to?'/>
                </div>
            </div>
            <div className="browse-content-wrapper">
                <h2>Browse all</h2>
            </div>
        </div>
    )
}