import { useState, useEffect, useMemo, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faPenToSquare,
    faTrash,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GetAllProductsApi, GetProductsByCategoryApi } from '../../services/productService';
import { GetAllCategoriesApi } from '../../services/categoryService';

import { AuthContext } from '../../context/AuthContextProvider';
import config from '../../config';

const cx = classNames.bind(styles);
function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [{ role }] = useContext(AuthContext);

    //Get All Products
    useEffect(() => {
        const getAllProducts = async () => {
            setProducts(await GetAllProductsApi());
        };
        // getAllProducts();
    }, []);

    //Get All Categories
    useEffect(() => {
        const getAllCategories = async () => {
            setCategories(await GetAllCategoriesApi());
        };
        // getAllCategories();
    }, []);

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

    //Active tab
    const [activeState, setActiveState] = useState(null);
    const activeTab = (id) => {
        setActiveState(id);
    };

    //Pagtination
    let pageSize = role === config.roles.USER || role === null ? 8 : 9;

    const [currentPage, setCurrentPage] = useState(1);

    const currentProductsPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, products]);

    //Get Prodcut By Category Id
    const handleRenderProductsByCategory = async (categoryId) => {
        if (categoryId) {
            setProducts(await GetProductsByCategoryApi(categoryId));
            setCurrentPage(1);
        } else {
            setProducts(await GetAllProductsApi());
            setCurrentPage(1);
        }
        activeTab(categoryId);
    };

    //Search Products
    const handleSearchProducts = async (e) => {
        e.preventDefault();
        if (searchValue !== '') {
            const filterProducts = products.filter(
                (product) =>
                    product.productName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
            );
            setProducts(filterProducts);
        } else {
            setProducts(await GetAllProductsApi());
        }
        setSearchValue('');
    };

    //Format Money
    const handleFormatMoney = (amount) => {
        const result = amount.toLocaleString('it-IT');
        return result;
    };

    return (
        <main>
            <div className={cx('container')}>
                {role === config.roles.USER || role === null ? (
                    <nav
                        className={cx(
                            'navbar',
                            'navbar-expand-lg',
                            'navbar-dark',
                            'mdb-color',
                            'lighten-3',
                            'mt-3',
                            'mb-5'
                        )}
                    >
                        {/* Navbar brand */}
                        <span className={cx('navbar-brand')}>Categories:</span>
                        {/* Collapsible content */}
                        <div
                            className="navbar-collapse d-flex justify-content-between"
                            id="basicExampleNav"
                        >
                            {/* Links */}
                            <ul className="navbar-nav mr-auto flex-row">
                                <li
                                    className={cx('nav-item', activeState === null ? 'active' : '')}
                                >
                                    <span
                                        className={cx('nav-link')}
                                        onClick={() => handleRenderProductsByCategory(null)}
                                    >
                                        All
                                    </span>
                                </li>
                                {categories.map((category) => (
                                    <li
                                        className={cx(
                                            'nav-item',
                                            activeState === category.categoryId ? 'active' : ''
                                        )}
                                        key={category.categoryId}
                                    >
                                        <span
                                            className={cx('nav-link')}
                                            onClick={() =>
                                                handleRenderProductsByCategory(category.categoryId)
                                            }
                                        >
                                            {category.categoryName}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {/* Links */}
                            <form
                                className={cx('form-inline')}
                                id={cx('search-form')}
                                onSubmit={handleSearchProducts}
                            >
                                <div className="md-form my-0">
                                    <input
                                        className="form-control mr-sm-2"
                                        type="text"
                                        placeholder="Search"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        {/* Collapsible content */}
                    </nav>
                ) : (
                    <div className={cx('d-flex', 'justify-content-between', 'mt-3', 'mb-3')}>
                        <Button
                            primary
                            to="/admin/product/add"
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            className={cx('add-btn')}
                        >
                            Add
                        </Button>
                        <form
                            className={cx('form-inline', 'admin')}
                            id={cx('search-form')}
                            onSubmit={handleSearchProducts}
                        >
                            <div className="md-form my-0" style={{ position: 'relative' }}>
                                <button
                                    type="submit"
                                    style={{
                                        padding: 0,
                                        color: 'red',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 6,
                                    }}
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                                <input
                                    style={{
                                        borderBottom: '1px solid #f92e2c',
                                        color: '#333',
                                        fontWeight: '500',
                                        paddingRight: '20px',
                                    }}
                                    className="form-control mr-sm-2"
                                    type="text"
                                    placeholder="Search"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/*Section: Products v.3*/}
                <section className="text-center mb-4">
                    {/*Grid row*/}
                    <div className="row wow fadeIn">
                        {/*Grid column*/}
                        {products && products.length > 0 ? (
                            currentProductsPagination.map((product) => (
                                <Link
                                    to={
                                        role === (config.roles.USER && null)
                                            ? `/product/details/${product.productId}`
                                            : `/admin/product/details/${product.productId}`
                                    }
                                    className={cx(
                                        'product-link',
                                        'col-md-6',
                                        'mb-4',
                                        role === config.roles.ADMIN ? 'col-lg-4' : 'col-lg-3',
                                        role === config.roles.ADMIN && 'admin'
                                    )}
                                    key={product.productId}
                                >
                                    {/*Card*/}
                                    <div className={cx('card')}>
                                        {/*Card image*/}
                                        <div className="view overlay">
                                            <img
                                                src={handleRenderImageOfCategory(
                                                    product.categoryId
                                                )}
                                                alt="product"
                                                className="card-img-top"
                                                style={{ height: '280px' }}
                                            />
                                        </div>
                                        {/*Card image*/}
                                        {/*Card content*/}
                                        <div className="card-body text-center">
                                            {/*Category & Title*/}
                                            <span href="" className={cx('category-text')}>
                                                <h5>
                                                    {categories.map((category) =>
                                                        category.categoryId === product.categoryId
                                                            ? category.categoryName
                                                            : null
                                                    )}
                                                </h5>
                                            </span>
                                            <h5>
                                                <strong>
                                                    <span
                                                        href=""
                                                        className={cx(
                                                            'dark-grey-text',
                                                            'name-text'
                                                        )}
                                                    >
                                                        {product.productName}
                                                    </span>
                                                </strong>
                                            </h5>
                                            <h4 className={cx('font-weight-bold', 'price-text')}>
                                                <strong>
                                                    {handleFormatMoney(product.unitPrice)} VNĐ
                                                </strong>
                                            </h4>
                                        </div>
                                        {/*Card content*/}

                                        {role === config.roles.ADMIN && (
                                            <div
                                                className={cx(
                                                    'action-btn',
                                                    'd-flex',
                                                    'align-items-center',
                                                    'justify-content-center',
                                                    'mb-2'
                                                )}
                                            >
                                                <Button
                                                    to={`/admin/product/edit/${product.productId}`}
                                                    leftIcon={
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    }
                                                    className={cx('edit-btn', 'btn', 'btn-success')}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    to={`/admin/product/delete/${product.productId}`}
                                                    leftIcon={<FontAwesomeIcon icon={faTrash} />}
                                                    className={cx(
                                                        'delete-btn',
                                                        'btn',
                                                        'btn-danger'
                                                    )}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    {/*Card*/}
                                </Link>
                            ))
                        ) : (
                            <h1>No Results Found</h1>
                        )}
                    </div>
                    {/*Grid row*/}
                </section>
                {/*Section: Products v.3*/}
                <Pagination
                    className={cx('pagination-bar')}
                    currentPage={currentPage}
                    totalCount={products.length}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
                <ToastContainer />
            </div>
        </main>
    );
}

export default Home;
