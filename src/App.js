import './css/App.css';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Product from "./pages/Product";
import MyProducts from "./pages/MyProducts";
import MyOffers from "./pages/./MyOffers";
import Navbar from "./components/Navbar"
import AdminControl from "./pages/AdminControl";
import SignUp from "./pages/SignUp";
import AuthProvider from "./components/AuthProvider";

function App() {

    return (
        <>
            <AuthProvider>
                <Navbar/>
                <div className="container">
                    <div>
                        <Routes>
                            <Route path={"/"} element={<Login/>}/>
                            <Route path={"/login"} element={<Login/>}/>
                            <Route path={"/sign-up"} element={<SignUp/>}/>
                            <Route path={"/dashboard"} element={<Dashboard/>}/>
                            <Route path={"/my-offers"} element={<MyOffers/>}/>
                            <Route path={"/my-products"} element={<MyProducts/>}/>
                            <Route path={"/product/:productID"} element={<Product/>}/>
                            <Route path={"/admin-control"} element={<AdminControl/>}/>
                        </Routes>
                    </div>
                </div>
            </AuthProvider>
        </>
    )
}

export default App;