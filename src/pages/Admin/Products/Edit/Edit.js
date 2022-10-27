import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '../../../../components/Button';
import styles from './Edit.module.scss';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GetProductByIdApi, UpdateProductApi } from '../../../../services/productService';
import { GetAllCategoriesApi } from '../../../../services/categoryService';

const cx = classNames.bind(styles);

function Edit() {
    const navigate = useNavigate();
    const productId = useParams().id;
    const [product, setProduct] = useState({});
    const [productName, setProductName] = useState(null);
    const [unitsInStock, setUnitsInStock] = useState(null);
    const [unitPrice, setUnitPrice] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);

    //Get Product By Id
    useEffect(() => {
        const getProductById = async () => {
            const product = await GetProductByIdApi(productId);
            setProduct(product);
            setProductName(product.productName);
            setUnitsInStock(product.unitsInStock);
            setUnitPrice(product.unitPrice);
            setCategoryId(product.categoryId);
        };
        getProductById();
    }, [productId]);

    //Get All Categories
    useEffect(() => {
        const getAllCategories = async () => {
            const categories = await GetAllCategoriesApi();
            setCategories(categories);
        };
        getAllCategories();
    }, []);

    //Handgle Update Product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const data = {
            productId: productId,
            productName: productName,
            weight: '0',
            unitsInStock: unitsInStock,
            unitPrice: unitPrice,
            categoryId: categoryId,
            categoryName: '',
        };
        try {
            await UpdateProductApi(data);
            toast.success('Update successfully!', {
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
    };

    return (
        <div className={cx('content', 'mt-4')}>
            <h1 className={cx('title')}>Edit Product</h1>
            <form action="" className={cx('add-form', 'mt-4')} onSubmit={handleUpdateProduct}>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="name" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Product's Name
                    </label>
                    <input
                        type="text"
                        className={cx('input-text')}
                        id="name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
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
                        value={unitsInStock}
                        onChange={(e) => setUnitsInStock(e.target.value)}
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
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                    />
                </div>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="name" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        defaultValue={'DEFAULT'}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="DEFAULT" disabled hidden>
                            {product.categoryName}
                        </option>
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    type="submit"
                    primary
                    className={cx('edit-btn', 'd-block', 'text-uppercase')}
                >
                    Save
                </Button>
            </form>
        </div>
    );
}

export default Edit;
