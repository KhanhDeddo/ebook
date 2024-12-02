import { ROUTER } from "./Utils/router";
import HomePage from "./Page/Home/home";
import LoginPage from "./Page/Login/login";
import {CartPage} from "./Page/Cart/cart";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "./Page/Home/MasterLayout/master_layout";
import RegisterPage from "./Page/Register/register";
import { Products } from "./Page/Products/products";
import { Orders } from "./Page/Orders/oders";
import { Profile } from "./Page/Profile/profile";
import { AdminHome } from "./Page/Admin/admin";
import BookDetails from "./Page/ProductDetail/productDetail";
import { PaymentPage } from "./Page/Payment/payment";

const RenderRouter = () => {
    const userRouters = [
        {
            path: ROUTER.USER.HOME,
            Component: <HomePage/>
        },
        {
            path: ROUTER.USER.LOGIN,
            Component: <LoginPage/>
        },
        {
            path: ROUTER.USER.REGISTER,
            Component: <RegisterPage/>
        },
        {
            path: ROUTER.USER.PROFILE,
            Component: <Profile/>
        },
        {
            path: ROUTER.USER.SHOPCART,
            Component: <CartPage/>
        },
        {
            path: ROUTER.USER.PRODUCTS,
            Component: <Products/>
        },
        {
            path: ROUTER.USER.ORDERS,
            Component: <Orders/>
        },
        {
            path: ROUTER.USER.PRODUCTDETAIL,
            Component:<BookDetails/>
        },
        {
            path: ROUTER.USER.PAYMENT,
            Component:<PaymentPage/>
        },
        {
            path: ROUTER.ADMIN.HOME,
            Component:<AdminHome/>
        }
    ];
    return (
        <Routes>
            {userRouters.map((item, key) => (
                <Route
                    key={key}
                    path={item.path}
                    element={
                        item.Component.type === LoginPage ||
                        item.Component.type === RegisterPage ||
                        item.Component.type === AdminHome
                        ? item.Component 
                            : <MasterLayout>{item.Component}</MasterLayout>
                    }
                />
            ))}
        </Routes>
        
    );
};

export default RenderRouter;
