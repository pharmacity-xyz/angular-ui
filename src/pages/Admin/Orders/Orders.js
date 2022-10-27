import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Orders.module.scss';

import Pagination from '../../../components/Pagination';

import { getAllOrdersApi} from '../../../services/orderService';

const cx = classNames.bind(styles);

function Orders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getAllOrders = async() => {
            const orders = await getAllOrdersApi();
            setOrders(orders);
            
        }
        getAllOrders();
    }, [])

    //Pagtination
    let pageSize = 6;

    const [currentPage, setCurrentPage] = useState(1);

    const currentOrdersPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return orders.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, orders]);

    return (
        <div className={cx("content", "mt-4", "position-relative")}>
            <h1 className={cx("title")}>Orders</h1>
            <table id={cx("orders")} className={cx("mt-4")}>
                <thead>
                <tr>
                    <th>Order's Id</th>
                    <th>Member's Id</th>
                    <th>Product's name</th>
                    <th>Date Ordered</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 && currentOrdersPagination.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.memberId}</td>
                            <td>{order.orderDetail.productName}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.orderDetail.quantity}</td>
                            <td>{order.orderDetail.discount}</td>
                            <td>{order.orderDetail.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination className={cx('pagination-bar', 'mt-4')}
                    currentPage={currentPage}
                    totalCount={orders.length}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)} />
        </div>
    );
}

export default Orders;
