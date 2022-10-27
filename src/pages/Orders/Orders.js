import { useState, useEffect, useContext, useMemo, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Orders.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';

import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/Modal/ConfirmModal';

import { AuthContext } from '../../context/AuthContextProvider';
import { deleteOrderApi, getAllOrdersByMemberApi } from '../../services/orderService';

const cx = classNames.bind(styles);

function Orders() {
    const [authState] = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    //Get all orders
    useEffect(() => {
        const getAllOrdersByMemberId = async () => {
            const orders = await getAllOrdersByMemberApi(authState.member.memberId);
            setOrders(orders);
        };
        getAllOrdersByMemberId();
    }, [authState.member.memberId]);

    //Pagtination
    let pageSize = 6;

    const [currentPage, setCurrentPage] = useState(1);

    const currentOrdersPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return orders.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, orders]);

    const handleRenderImageOfCategory = (id) => {
        switch (id) {
            case 1:
                return 'https://vivina.net/static/media/images/news/ca-cau-vong-boesemans-rainbowfish-1536x1021-1629620543.jpg';
            case 2:
                return 'https://p2u4d7g7.stackpathcdn.com/wp-content/uploads/sites/11/2019/09/orinoco_altum-copy.jpg';
            case 3:
                return 'https://www.aquariumfishonline.com.au/wp-content/uploads/2021/11/Discus-Red-Malboro-Melon.jpg';
            case 4:
                return 'https://st2.depositphotos.com/1037861/6377/i/600/depositphotos_63772197-stock-photo-corydoras-fish.jpg';
            case 5:
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzTUMX32EM2RXsT3q5_g2i7vPmczPX3is80w&usqp=CAU';
            default:
                return 'https://rlv.zcache.ca/tbd_stamp_classic_round_sticker-r4784b0e615b0424bac1e083b0ef4ec4e_0ugmp_8byvr_736.jpg';
        }
    };

    //Modal
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const ref = useRef();

    const openModal = (e, id) => {
        e.preventDefault();
        ref.current = id;
        console.log(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleDeleteOrder = async (e) => {
        e.preventDefault();
        await deleteOrderApi(ref.current);
        closeModal();
        toast.success(`Delete 'Order ${ref.current}' successfully!`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
        setOrders(await getAllOrdersByMemberApi(authState.member.memberId));
        setCurrentPage(1);
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('order-list', 'row')}>
                {orders && orders.length > 0 ? (
                    currentOrdersPagination.map((order) => (
                        <li className={cx('col-lg-6')} key={order.orderId}>
                            <div className={cx('order-item', 'position-relative')}>
                                <div className={cx('product-img')}>
                                    <img
                                        src={handleRenderImageOfCategory(
                                            order.orderDetail.categoryId
                                        )}
                                        alt="product"
                                    />
                                </div>
                                <div className={cx('product-info')}>
                                    <div className={cx('info-line')}>
                                        <h5>Order Id</h5>
                                        <span
                                            className={cx('info-value')}
                                            style={{ color: 'blue' }}
                                        >
                                            {order.orderId}
                                        </span>
                                    </div>
                                    <div className={cx('info-line')}>
                                        <h5>Order Date</h5>
                                        <span
                                            className={cx('info-value')}
                                            style={{ color: '#F39C12' }}
                                        >
                                            {order.orderDate}
                                        </span>
                                    </div>
                                    <div className={cx('info-line')}>
                                        <h5>Product</h5>
                                        <span className={cx('info-value')} style={{ color: 'red' }}>
                                            {order.orderDetail.productName}
                                        </span>
                                    </div>
                                    <div className={cx('info-line')}>
                                        <h5>Quantity</h5>
                                        <span
                                            className={cx('info-value')}
                                            style={{ color: '#F4D03F' }}
                                        >
                                            {order.orderDetail.quantity}
                                        </span>
                                    </div>
                                    <div className={cx('info-line')}>
                                        <h5>Discount</h5>
                                        <span
                                            className={cx('info-value')}
                                            style={{ color: '#CB4335' }}
                                        >
                                            {order.orderDetail.discount * 100}%
                                        </span>
                                    </div>
                                    <div className={cx('info-line')}>
                                        <h5>Total</h5>
                                        <span
                                            className={cx('info-value')}
                                            style={{ color: 'green' }}
                                        >
                                            {order.orderDetail.totalPrice}
                                        </span>
                                    </div>
                                    <div className={cx('delete-btn')}>
                                        <Button
                                            onClick={(e) => openModal(e, order.orderId)}
                                            leftIcon={<FontAwesomeIcon icon={faTrash} />}
                                            className={cx('position-absolute', 'btn', 'btn-danger')}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <h1 className={cx('text-center')}>Look like you don't have any orders!</h1>
                )}
            </ul>
            {modalIsOpen && (
                <ConfirmModal
                    onClose={closeModal}
                    content={`delete 'Order ${ref.current}' from Orders`}
                    onConfirm={handleDeleteOrder}
                />
            )}
            <Pagination
                className={cx('pagination-bar')}
                currentPage={currentPage}
                totalCount={orders.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default Orders;
