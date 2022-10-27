import { useState, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Categories.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../../../components/Button';
import Pagination from '../../../components/Pagination';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

import {
    AddCategoryApi,
    DeleteCategoryApi,
    GetAllCategoriesApi,
    UpdateCategoryApi,
} from '../../../services/categoryService';

const cx = classNames.bind(styles);

function Categories() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    //Get All Categories
    useEffect(() => {
        const getAllCategories = async () => {
            const categories = await GetAllCategoriesApi();
            setCategories(categories);
        };
        getAllCategories();
    }, []);

    //Add Category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (categoryName) {
            if (
                categories.some(
                    (category) =>
                        category.categoryName.toLowerCase().trim() ===
                        categoryName.toLowerCase().trim()
                )
            ) {
                toast.error(`Category '${categoryName.trim()}' has already existed!`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                setCategoryName('');
            } else {
                try {
                    await AddCategoryApi({
                        categoryName: categoryName.trim(),
                    });
                    toast.success(`Add '${categoryName.trim()}' successfully!`, {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                    setCategoryName('');
                    setCategories(await GetAllCategoriesApi());
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            toast.error('Category name cannot be empty!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
    };

    //Delete Categories
    const handleDeleteCategory = async (e) => {
        e.preventDefault();
        await DeleteCategoryApi(ref.current);
        closeModal();
        toast.success(
            `Delete '${
                categories.find((category) => category.categoryId === ref.current).categoryName
            }' successfully!`,
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
        setCategories(await GetAllCategoriesApi());
        setCurrentPage(1);
    };

    //Click EDIT Button

    const handleEditBtnClick = (e, category) => {
        e.preventDefault();
        setSelectedCategory(category);
        // const categoryName = document.querySelector(`td[data-id='${category.categoryId}']`)
    };

    //EDIT Category
    const handleUpdateCategory = async (e, category) => {
        e.preventDefault();
        const categoryName = document.querySelector(`td[data-id='${category.categoryId}']`);
        if (category.categoryName === categoryName.innerHTML) {
            toast.error('No change found!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            setSelectedCategory(null);
        } else if (
            categories.some(
                (category) =>
                    category.categoryName.toLowerCase().trim() ===
                    categoryName.innerHTML.toLowerCase().trim()
            )
        ) {
            toast.error(`Category '${categoryName.innerHTML.trim()}' has already existed!`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            setSelectedCategory(null);
            categoryName.innerHTML = category.categoryName;
        } else {
            await UpdateCategoryApi({
                categoryId: category.categoryId,
                categoryName: categoryName.innerHTML.trim(),
            });
            setSelectedCategory(null);
            toast.success(
                `Update category from '${category.categoryName.trim()}' to '${categoryName.innerHTML.trim()}' successfully!`,
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
            setCategories(await GetAllCategoriesApi());
        }
    };

    //Click Cancel Button
    const handleCancelBtnClick = (e, category) => {
        e.preventDefault();
        setSelectedCategory(null);
        const categoryName = document.querySelector(`td[data-id='${category.categoryId}']`);
        categoryName.innerHTML = selectedCategory.categoryName;
    };

    //Pagtination
    let pageSize = 6;

    const [currentPage, setCurrentPage] = useState(1);

    const currentCategoriesPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return categories.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, categories]);
    const isEdit = !!selectedCategory;
    return (
        <div className={cx('content', 'mt-4', 'position-relative')}>
            <h1 className={cx('title')}>Categories</h1>
            <form
                id={cx('add-form')}
                className={cx('position-absolute', 'end-0')}
                onSubmit={handleAddCategory}
            >
                <input
                    type="text"
                    name="category"
                    id="category"
                    style={{
                        padding: '4px 8px',
                        marginRight: '4px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        outline: 'none',
                    }}
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    className={cx('add-btn')}
                    style={{ padding: '4px 8px' }}
                >
                    Add
                </Button>
            </form>
            <table id={cx('categories')} className={cx('mt-4')}>
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.length > 0 &&
                        currentCategoriesPagination.map((category) => (
                            <tr key={category.categoryId}>
                                <td>{category.categoryId}</td>
                                <td
                                    data-id={category.categoryId}
                                    style={
                                        category.categoryId === selectedCategory?.categoryId
                                            ? {
                                                  border: '2px solid black',
                                                  borderRadius: '4px',
                                              }
                                            : {}
                                    }
                                    contentEditable={
                                        category.categoryId === selectedCategory?.categoryId
                                    }
                                >
                                    {category.categoryName}
                                </td>
                                {isEdit && category.categoryId === selectedCategory?.categoryId ? (
                                    <td className={cx('d-flex', 'justify-content-start')}>
                                        <Button
                                            onClick={(e) => handleUpdateCategory(e, category)}
                                            leftIcon={<FontAwesomeIcon icon={faCheck} />}
                                            className={cx('btn', 'btn-success')}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={(e) => handleCancelBtnClick(e, category)}
                                            leftIcon={<FontAwesomeIcon icon={faX} />}
                                            className={cx('btn', 'btn-danger')}
                                        >
                                            Cancel
                                        </Button>
                                    </td>
                                ) : (
                                    <td className={cx('d-flex', 'justify-content-start')}>
                                        <Button
                                            onClick={(e) => handleEditBtnClick(e, category)}
                                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                            className={cx('btn', 'btn-success')}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={(e) => openModal(e, category.categoryId)}
                                            leftIcon={<FontAwesomeIcon icon={faTrash} />}
                                            className={cx('btn', 'btn-danger')}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
            {modalIsOpen && (
                <ConfirmModal
                    onClose={closeModal}
                    content={`delete '${
                        categories.find((category) => category.categoryId === ref.current)
                            .categoryName
                    }' from Categories`}
                    onConfirm={handleDeleteCategory}
                />
            )}
            <Pagination
                className={cx('pagination-bar', 'mt-4')}
                currentPage={currentPage}
                totalCount={categories.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default Categories;
