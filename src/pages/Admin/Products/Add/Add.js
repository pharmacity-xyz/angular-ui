import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Add.module.scss';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../components/Button';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AddProductApi, GetAllProductsApi } from '../../../../services/productService';
import { GetAllCategoriesApi } from '../../../../services/categoryService';

const cx = classNames.bind(styles);

function Add() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            const products = await GetAllProductsApi();
            setProducts(products);
        };
        getAllProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const [
            { value: productName },
            { value: unitsInStock },
            { value: unitPrice },
            { value: categoryId },
        ] = e.target;
        const data = {
            productName: productName.trim(),
            weight: '0',
            unitsInStock: unitsInStock,
            unitPrice: unitPrice,
            categoryId: categoryId,
            categoryName: '',
        };
        try {
            if (
                products.some(
                    (product) =>
                        product.productName.toLowerCase().trim() ===
                        productName.toLowerCase().trim()
                )
            ) {
                toast.error(`Product '${productName.trim()}' has already existed!`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            } else {
                await AddProductApi(data);
                toast.success(
                    `Add '${productName.trim()}' to ${getCategoryNameById(
                        categoryId
                    )} successfully!`,
                    {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    }
                );
                setProducts(await GetAllProductsApi());
                navigate('/admin');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getAllCategories = async () => {
            const categories = await GetAllCategoriesApi();
            setCategories(categories);
        };
        getAllCategories();
    }, []);

    const getCategoryNameById = (categoryId) => {
        return categories.find((category) => category.id === categoryId).categoryName;
    };

    return (
        <div className={cx('content', 'mt-4')}>
            <h1 className={cx('title')}>Add Product</h1>
            <form action="" className={cx('add-form', 'mt-4')} onSubmit={handleAddProduct}>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="name" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Product's Name
                    </label>
                    <input type="text" className={cx('input-text')} id="name" />
                </div>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="unit-stock" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Unit In Stock
                    </label>
                    <input type="number" className={cx('input-text')} id="unit-stock" />
                </div>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="unit-price" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Unit Price
                    </label>
                    <input type="number" className={cx('input-text')} id="unit-price" />
                </div>
                <div className={cx('input-group', 'd-flex', 'flex-column', 'mt-3', 'mb-3')}>
                    <label htmlFor="name" className={cx('input-label', 'mt-2', 'mb-2')}>
                        Category
                    </label>
                    <select name="category" id="category" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled hidden>
                            -- Select category of product --
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
                    className={cx('add-btn', 'd-block', 'text-uppercase')}
                >
                    Save
                </Button>
            </form>
        </div>
    );
}

export default Add;
