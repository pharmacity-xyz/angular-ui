const adminRoutes = {
    admin: '/admin',
    adminProductDetail: '/admin/product/details/:id',
    adminCategories: '/admin/categories',
    adminProfile: '/admin/profile',
    adminOrders: '/admin/orders',
    adminChangePassword: '/admin/password/change',
    adminAddProduct: '/admin/product/add',
    adminEditProduct: '/admin/product/edit/:id',
    adminDeleteProduct: '/admin/product/delete/:id',
}

const routes = {
    ...adminRoutes,
    home: '/',
    details: '/product/details/:id',
    profile: '/profile/',
    orders: '/orders',
    changePassword: '/password/change'
}

export default routes