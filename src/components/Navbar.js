import {Link, Route, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import '../css/App.css';
import Cookies from "js-cookie";
import {useContext, useEffect, useState} from "react";
import {getUserDetails} from "../services/GetUserDetails";
import {AuthContext} from './AuthProvider';


export default function Navbar() {
    const projectUrl = "https://github1s.com/yitzhak-amsalem/Auction-Client/blob/HEAD/src/App.js"
    const [token, setToken] = useState()
    const [credit, setCredit] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [username, setUsername] = useState("")
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    const {updateNavbar, setUpdateNavbar} = useContext(AuthContext);

    useEffect(() => {
        const token = Cookies.get("token")
        if (token === undefined) {
            navigate("../login");
        } else {
            getUserDetails(token, (response) => {
                if (response.data.success) {
                    setCredit(response.data.credit)
                    console.log("admin: " + response.data.admin)
                    setUsername(response.data.username)
                    setIsAdmin(response.data.admin)
                    setToken(token)
                }
                setSuccess(response.data.success)
            })
        }
        console.log("UN: " + updateNavbar)
        setUpdateNavbar(false)
    }, [updateNavbar])

    const logOut = () => {
        Cookies.remove("token");
        setSuccess(false)
        navigate("../login");
    }

    const goToDashboard = () => {
        navigate("../dashboard");
    }

    return (
        <nav className="nav">
            <div>
                {
                    success ?
                        <>
                            {
                                !isAdmin &&
                                <ul>
                                    <CustomLink to="/my-products">My Products</CustomLink>
                                    <CustomLink to="/my-offers">My Offers</CustomLink>
                                </ul>
                            }
                        </>
                        :
                        <ul>
                            <CustomLink to="/sign-up">SignUp</CustomLink>
                            <CustomLink to="/login">Login</CustomLink>
                        </ul>
                }
            </div>
            <div className="site-title">
                {
                    success &&
                        <div>
                            <button className="title-element" id={"title-username"} onClick={goToDashboard}>
                                {username.slice(0, 1).toUpperCase()}
                            </button>
                            <span className="title-element" id={"title-credit"}>
                                {isAdmin ? "System" : "Your"} Credit: {credit} $
                            </span>
                            <button className="title-element" id={"title-button"} onClick={logOut}>
                                Log Out
                            </button>
                        </div>
                }
                <div>
                    <a className="title-element" rel="noopener noreferrer" target={"_blank"} href={projectUrl}
                       id={"title"}>
                        DEY Auctions LTD
                    </a>
                </div>
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
