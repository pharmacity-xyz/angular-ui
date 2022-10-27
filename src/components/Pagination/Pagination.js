import classNames from "classnames/bind";
import styles from './Pagination.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

import { usePagination, DOTS } from '../../hooks/usePagination';

const cx = classNames.bind(styles);

function Pagination({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className }) {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul
            className={cx('pagination-container', { [className]: className })}
        >
            <li
                className={cx('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <button className={cx('prev-btn')}><FontAwesomeIcon icon={faAnglesLeft} /></button>
            </li>
            {
                paginationRange.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return <li className="pagination-item dots"><button>&#8230;</button></li>;
                    }

                    return (
                        <li
                            className={cx('pagination-item', {
                                selected: pageNumber === currentPage
                            })}
                            onClick={() => onPageChange(pageNumber)}
                            key={pageNumber}
                        >
                            <button className={cx('pagination-btn', {
                                actived: pageNumber === currentPage
                            })}>{pageNumber}</button>
                        </li>
                    );
                })
            }
            <li
                className={cx('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <button className={cx('next-btn')}><FontAwesomeIcon icon={faAnglesRight} /></button>
            </li>
        </ul >
    );
}

export default Pagination;