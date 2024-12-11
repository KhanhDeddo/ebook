import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./Utils/router";
import HomePage from "./Page/Home/home";
import LoginPage from "./Page/Login/login";
import RegisterPage from "./Page/Register/register";
import { CartPage } from "./Page/Cart/cart";
import { Products } from "./Page/Products/products";
import  Orders  from "./Page/Orders/oders";
import { Profile } from "./Page/Profile/profile";
import BookDetails from "./Page/ProductDetail/productDetail";
import { PaymentPage } from "./Page/Payment/payment";
import MasterLayout from "./Page/Home/MasterLayout/master_layout";
import { AdminHome } from "./Page/Admin/admin";
import AdminLayout from "./Page/Admin/components/layout/AdminLayout";
import AdminProduct from "./Page/Admin/pages/product/AdminProduct";
import AdminOrder from "./Page/Admin/pages/order/AdminOrder";
import AdminAddProduct from "./Page/Admin/pages/add-product/AdminAddProduct";
import AdminProfile from "./Page/Admin/pages/profile/AdminProfile";
import AdminWallet from "./Page/Admin/pages/wallet/AdminWallet";
import NotFound from "./Page/Admin/components/NotFound";
import AdminUser from "./Page/Admin/pages/user/AdminUser";

const RenderRouter = () => {
    // route user
    const userRoutes = [
        { path: ROUTER.USER.HOME, Component: <HomePage /> },
        { path: ROUTER.USER.LOGIN, Component: <LoginPage /> },
        { path: ROUTER.USER.REGISTER, Component: <RegisterPage /> },
        { path: ROUTER.USER.PROFILE, Component: <Profile /> },
        { path: ROUTER.USER.SHOPCART, Component: <CartPage /> },
        { path: ROUTER.USER.PRODUCTS, Component: <Products /> },
        { path: ROUTER.USER.ORDERS, Component: <Orders /> },
        { path: ROUTER.USER.PRODUCTDETAIL, Component: <BookDetails /> },
        { path: ROUTER.USER.PAYMENT, Component: <PaymentPage /> },
    ];

    // route admin
    const adminRoutes = [
        { path: ROUTER.ADMIN.HOME, Component: <AdminHome /> },
        { path: ROUTER.ADMIN.PRODUCT, Component: <AdminProduct /> },
        { path: ROUTER.ADMIN.ORDER, Component: <AdminOrder /> },
        { path: ROUTER.ADMIN.ADD_PRODUCT, Component: <AdminAddProduct /> },
        { path: ROUTER.ADMIN.PROFILE, Component: <AdminProfile /> },
        { path: ROUTER.ADMIN.WALLET, Component: <AdminWallet /> },
        { path: ROUTER.ADMIN.USER, Component: <AdminUser/>},
        { path: "*", Component: <NotFound /> },
    ];

    return (
        <Routes>
            {/* Render User Routes */}
            {userRoutes.map((route, index) => (
                <Route
                    key={`user-${index}`}
                    path={route.path}
                    element={
                        // Login và Register không cần MasterLayout
                        route.Component.type === LoginPage ||
                        route.Component.type === RegisterPage
                            ? route.Component
                            : <MasterLayout>{route.Component}</MasterLayout>
                    }
                />
            ))}

            {/* Render Admin Routes */}
            {adminRoutes.map((route, index) => (
                <Route
                    key={`admin-${index}`}
                    path={route.path}
                    element={<AdminLayout>{route.Component}</AdminLayout>}
                />
            ))}
        </Routes>
    );
};

export default RenderRouter;
