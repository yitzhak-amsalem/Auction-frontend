import {Link, Route, useMatch, useResolvedPath} from "react-router-dom";
import '../css/App.css';


export default function Navbar() {
    const projectUrl = "https://github1s.com/yitzhak-amsalem/Auction-Client/blob/HEAD/src/App.js"
    return (
        <nav className="nav">
            <ul>
                <CustomLink to="/my-products">My Products</CustomLink>
                <CustomLink to="/my-offers">My Offers</CustomLink>
            </ul>

            <div className="site-title">
                <a rel="noopener noreferrer" target={"_blank"} href={projectUrl} id={"title"}>
                    DEY Auctions LTD
                </a>
            </div>
        </nav>
    )
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
