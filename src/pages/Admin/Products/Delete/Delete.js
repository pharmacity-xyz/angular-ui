import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '../../../../components/Button';
import styles from './Delete.module.scss';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GetProductByIdApi, DeleteProductApi } from '../../../../services/productService';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';

const cx = classNames.bind(styles);

function Delete() {
    const navigate = useNavigate();
    const productId = useParams().id;
    const [product, setProduct] = useState({});

    //Modal
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    //Get Product By Id
    useEffect(() => {
        const getProductById = async () => {
            const product = await GetProductByIdApi(productId);
            setProduct(product);
        };
        getProductById();
    }, [productId]);

    //Handle delete product
    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        if (product.productId) {
            try {
                await DeleteProductApi(product.productId);
                toast.success(`Delete '${product.productName}' successfully!`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                navigate('/admin');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={cx('content', 'mt-4')}>
            <h1 className={cx('title')}>Delete Product</h1>
            <form action="" className={cx('add-form', 'mt-4')} onSubmit={openModal}>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="name" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Product's Name
                    </label>
                    <input
                        type="text"
                        className={cx('input-text')}
                        id="name"
                        value={product.productName}
                        readOnly
                    />
                </div>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="unit-stock" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Unit In Stock
                    </label>
                    <input
                        type="number"
                        className={cx('input-text')}
                        id="unit-stock"
                        value={product.unitsInStock}
                        readOnly
                    />
                </div>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="unit-price" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Unit Price
                    </label>
                    <input
                        type="number"
                        className={cx('input-text')}
                        id="unit-price"
                        value={product.unitPrice}
                        readOnly
                    />
                </div>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="name" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Category
                    </label>
                    <input
                        type="text"
                        className={cx('input-text')}
                        id="unit-price"
                        value={product.categoryName}
                        readOnly
                    />
                </div>
                <Button
                    type="submit"
                    primary
                    className={cx('delete-btn', 'd-block', 'text-uppercase')}
                >
                    Delete
                </Button>
            </form>
            {modalIsOpen && (
                <ConfirmModal
                    onClose={closeModal}
                    onConfirm={handleDeleteProduct}
                    content={`delete '${product.productName}' from Products`}
                />
            )}
        </div>
    );
}

export default Delete;
