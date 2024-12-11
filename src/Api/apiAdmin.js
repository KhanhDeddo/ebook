import httpClient from "./httpClient";

var _httpClient = new httpClient("/admin");

//#region tổng quan
export const getDashboard = () => {
    return _httpClient.getAsync("/dashboard");
}

export const getOrderRecent = () => {
    return _httpClient.getAsync("/order-recent");
}

export const getUserRecent = () => {
    return _httpClient.getAsync("/user-recent");
}
//#endregion

//#region  đơn hàng
export const getOrders = (payload) => {
    return _httpClient.postAsync("/orders", payload);
}

export const getOrderDetail = (orderId) => {
    return _httpClient.getAsync(`/orderitems/${orderId}`);
}

export const updateStatusOrder = (payload) => {
    return _httpClient.putAsync('/orders', payload);
}
//#endregion

//#region  product
export const getProducts = (payload) => {
    return _httpClient.postAsync("/products", payload);
}

export const getProductDetail = (id) => {
    return _httpClient.getAsync(`/products/${id}`);
}

export const updateProduct = (payload) => {
    return _httpClient.putAsync(`/books`, payload);
}

export const addProduct = (payload) => {
    return _httpClient.postAsync(`/books`, payload);
}
//#endregion  product

//#region người dùng
export const getUsers = (payload) => {
    return _httpClient.postAsync("/users", payload);
}

export const updateUser = (payload) => {
    return _httpClient.putAsync(`/users`, payload);
}

export const addUser = (payload) => {
    return _httpClient.postAsync(`/add-user`, payload);
}
//#endregion