import config from '../config';

import Home from '../pages/Home'
import Profile from '../pages/Profile';
import Details from '../pages/Products/Details'
import Orders from '../pages/Orders'
import {ChangePassword} from '../pages/Security/Password/Change'
import Add from '../pages/Admin/Products/Add';
import Edit from '../pages/Admin/Products/Edit';
import Delete from '../pages/Admin/Products/Delete';
import { AdminOrders } from '../pages/Admin/Orders';

import SliderLayout from '../layouts/SliderLayout'
import AdminLayout from '../layouts/AdminLayout'

import AdminGuard from '../components/Guard/AdminGuard'
import UserGuard from '../components/Guard/UserGuard'
import Categories from '../pages/Admin/Categories';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: SliderLayout, guard: UserGuard},
    { path: config.routes.profile, component: Profile },
    { path: config.routes.adminProfile, component: Profile },
    { path: config.routes.details, component: Details },
    { path: config.routes.adminProductDetail, component: Details, layout: AdminLayout },
    { path: config.routes.orders, component: Orders },
    { path: config.routes.adminOrders, component: AdminOrders, layout: AdminLayout },
    { path: config.routes.adminCategories, component: Categories, layout: AdminLayout },
    { path: config.routes.changePassword, component: ChangePassword },
    { path: config.routes.adminChangePassword, component: ChangePassword},
    { path: config.routes.admin, component: Home, layout: AdminLayout, guard: AdminGuard},
    { path: config.routes.adminAddProduct, component: Add, layout: AdminLayout},
    { path: config.routes.adminEditProduct, component: Edit, layout: AdminLayout},
    { path: config.routes.adminDeleteProduct, component: Delete, layout: AdminLayout},
];

export { publicRoutes }