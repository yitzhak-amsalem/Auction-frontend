import React, {useState, useEffect, useContext} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {getMyProducts} from "../services/GetMyProducts";
import ErrorMessage from "../ErrorMessage";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import {AuthContext} from "../components/AuthProvider";
import {getUserDetails} from "../services/GetUserDetails";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CountUp from 'react-countup';

export default function MyProducts() {
    const [myProducts, setMyProducts] = useState([]);
    const [token, setToken] = useState("")
    const [success, setSuccess] = useState(false);
    const [addMoreAuction, setAddMoreAuction] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const [productName, setProductName] = useState("")
    const [description, setDescription] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [price, setPrice] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const {setUpdateNavbar} = useContext(AuthContext);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            getUserDetails(token, (response) => {
                if (response.data.success) {
                    if (response.data.admin) {
                        setIsAdmin(true);
                    } else {
                        getProducts()
                        setToken(token)
                    }
                }
                setSuccess(response.data.success)
            })
        }
    }, [])

    const getProducts = () => {
        const token = Cookies.get("token");
        getMyProducts(token, (response) => {
            if (response.data.success) {
                setSuccess(response.data.success)
                setMyProducts(response.data.myProducts)
            }
        })
    }
    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)
    }
    const addAuction = () => {
        sendApiPostRequest("http://localhost:8989/add-auction", {
            token,
            productName,
            description,
            imageLink,
            price
        }, (response) => {
            setSuccess(response.data.success)
            setErrorCode(response.data.errorCode)
            setTimeout(() => {
                setSuccess(false)
                setErrorCode(0)
            }, 3000)
            setAddMoreAuction(false)
            setProductName("")
            setDescription("")
            setImageLink("")
            setPrice(0)
            getProducts()
            if (response.data.success) {
                setUpdateNavbar(true)
            }
        })

    }

    return (
        <div className={"my-products-page"}>
            {
                isAdmin ?
                    <div className={"error-message"}
                         style={{fontSize: "2.5em", marginTop: "50px", backgroundColor: ""}}>
                        Admin can't have products.
                    </div>
                    :
                    <div>
                        {
                            myProducts.length > 0 ?
                                <table>
                                    <thead>
                                    <tr id={"table-row-header"}>
                                        <th className={"border-header"}>Product Name</th>
                                        <th className={"border-header"}>Max Amount</th>
                                        <th className={"border-header"}>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        myProducts.map((product, i) => {
                                            return (
                                                <tr style={{cursor: "pointer"}}
                                                    onClick={() => goToProduct(product.productID)}
                                                    key={i}>
                                                    <td>{product.productName}</td>
                                                    <td>{product.maxAmount === null ? "-" : <CountUp start={0}
                                                                                                     end={product.maxAmount}
                                                                                                     duration={1}
                                                    />}</td>
                                                    <td>{product.isOpen ? "open" : "close"}</td>
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
                                            You don't have any product.
                                        </div>
                                    }
                                </div>
                        }
                        <button className={"button"}
                                onClick={() => setAddMoreAuction(!addMoreAuction)}>{addMoreAuction ? "Close" : "Add auction"}</button>
                        {
                            addMoreAuction &&
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <div>
                                            <TextField
                                                id="filled-required"
                                                label="Product Name"
                                                type="text"
                                                variant="filled"
                                                required={true}
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="filled-required"
                                                label="Description"
                                                type="text"
                                                variant="filled"
                                                required={true}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="filled-required"
                                                label="Image Link"
                                                type="text"
                                                variant="filled"
                                                required={true}
                                                value={imageLink}
                                                onChange={(e) => setImageLink(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="filled-number"
                                                label="Price"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    required: true
                                                }}
                                                variant="filled"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </Box>
                                <button className={"button"}
                                        disabled={productName === "" || description === "" || imageLink === ""}
                                        onClick={addAuction}>Save
                                </button>
                            </div>
                        }
                        {
                            (success && errorCode === null) ?
                                <div className={"success-message"}>The Auction added successfully</div>
                                :
                                errorCode > 0 &&
                                <ErrorMessage errorCode={errorCode} lineBreak={true}/>
                        }
                    </div>
            }
        </div>
    );
}