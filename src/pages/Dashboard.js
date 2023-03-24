import React, {useState, useEffect, useContext} from "react";
import {getAllAuctions} from "../services/AdminServices";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {getUserDetails} from "../services/GetUserDetails";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthContext} from "../components/AuthProvider";

export default function Dashboard() {
    const [auctions, setAuctions] = useState([]);
    const [searchProduct, setSearchProduct] = useState("")
    const [success, setSuccess] = useState(false)
    const [sortedByName, setSortedByName] = useState(false)
    const [sortedByDate, setSortedByDate] = useState(false)
    const [username, setUsername] = useState("")
    const {setUpdateNavbar} = useContext(AuthContext);
    const navigate = useNavigate();

    const getAuctions = () => {
        const token = Cookies.get("token")
        getAllAuctions(token, (response) => {
            if (response.data.success) {
                setAuctions(response.data.allAuctions)
            }
            setSuccess(response.data.success)
        })
    }
    useEffect(() => {
        const token = Cookies.get("token")
        if (token === undefined) {
            navigate("../login");
        } else {
            getUserDetails(token, (response) => {
                if (response.data.success) {
                    if (response.data.admin) {
                        navigate("../admin-control");
                    } else {
                        setUsername(response.data.username)
                        getAuctions()
                    }
                }
                setSuccess(response.data.success)
            })
            const sse = new EventSource("http://localhost:8989/sse-handler?token=" + token)
            sse.onmessage = (message) => {
                console.log(message.data)
                const data = message.data;
                if (data === "NEW_OFFER") {
                    notify("Someone added a new offer!")
                } else if (data === "CLOSE_AUCTION") {
                    notify("Auction that you offered is closed!")
                    setUpdateNavbar(true)
                }
                getAuctions()
            }
        }
    }, []);

    const notify = (message) => toast(message);

    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)
    }

    const sortByName = () => {
        setSortedByName(!sortedByName)
        setSortedByDate(false)
        sortedByName ?
            auctions.sort((b, a) => a.productObj.name.localeCompare(b.productObj.name))
            :
            auctions.sort((a, b) => a.productObj.name.localeCompare(b.productObj.name))
    }
    const sortByDate = () => {
        setSortedByDate(!sortedByDate)
        setSortedByName(false)
        sortedByDate ?
            auctions.sort((b, a) => a.openingDate.localeCompare(b.openingDate))
            :
            auctions.sort((a, b) => a.openingDate.localeCompare(b.openingDate))
    }

    return (
        <div className={"dashboard-page"}>
            {
                success &&
                <div>
                    <Paper
                        sx={{p: '2px 4px', marginTop: "15px", display: 'flex', alignItems: 'center', width: 300}}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Search Auction..."
                            onChange={(e) => {
                                setSearchProduct(e.target.value)
                            }}
                        />
                        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                        <IconButton disabled={true} sx={{p: '10px'}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                </div>
            }
            <div className={"my-details-table auction-table-user"}>
                {
                    auctions.length > 0 ?
                        <table style={{
                            borderRadius: "5px"
                        }}>
                            <thead>
                            <tr id={"table-row-header"}>
                                <th onClick={sortByName} className={"border-header border-header-sort"}>
                                    Product name {
                                    sortedByName ?
                                        <span>&#8595;</span>
                                        :
                                        <span>&#8593;</span>
                                }
                                </th>
                                <th className={"border-header"}>Product image</th>
                                <th onClick={sortByDate} className={"border-header border-header-sort"}>
                                    Opening date {
                                    sortedByDate ?
                                        <span>&#8595;</span>
                                        :
                                        <span>&#8593;</span>
                                }
                                </th>
                                <th className={"border-header"}>My offers</th>
                                <th className={"border-header"}>Sum offers</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                auctions
                                    .filter(auction => auction.productObj.name.toUpperCase()
                                        .startsWith(searchProduct.toUpperCase()))
                                    .map((auction, i) => {
                                        return (
                                            <tr style={{cursor: "pointer"}}
                                                onClick={() => goToProduct(auction.productObj.productID)}
                                                key={i}>
                                                <td>{auction.productObj.name}</td>
                                                <td>
                                                    <img style={{
                                                        width: "80px",
                                                        height: "80px",
                                                        border: "none",
                                                        padding: "0px",
                                                        margin: "0px"
                                                    }}
                                                         alt={auction.productObj.description}
                                                         src={auction.productObj.imageLink}/>
                                                </td>
                                                <td>{auction.openingDate}</td>
                                                <td>{username === auction.productObj.owner.username ? "-" : auction.myOffers.length}</td>
                                                <td>{auction.sumOffers}</td>
                                            </tr>
                                        )
                                    })
                            }
                            </tbody>
                        </table>
                        :
                        <div>
                            {
                                success &&
                                <div className={"error-message"}
                                     style={{fontSize: "2.5em", marginTop: "50px", backgroundColor: ""}}>
                                    No auctions.
                                </div>
                            }
                        </div>
                }
            </div>
            <ToastContainer
            />
        </div>
    );
}