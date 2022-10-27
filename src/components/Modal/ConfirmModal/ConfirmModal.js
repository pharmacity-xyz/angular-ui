import classNames from 'classnames/bind';
import styles from './ConfirmModal.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faX} from '@fortawesome/free-solid-svg-icons'

import Button from '../../Button';

const cx = classNames.bind(styles)


function ConfirmModal({onClose, onConfirm, content}) {
    return (
        <div className={cx('confirm-modal', 'position-fixed', 'top-0', 'start-0', 'bottom-0', 'end-0', 'd-flex', 'align-items-center', 'justify-content-center')}>
            <div className={cx('modal-dialog', 'text-center')}>
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header', 'd-block', 'text-center')}>
                        <h3 className={cx('modal-title')}>Confirm</h3>
                    </div>
                    <div className={cx('modal-body')}>
                        <form id={cx('confirm-form')} onSubmit={onConfirm}>
                            <h1 className={cx('confirm-title')}>Are you sure want to {content}?</h1>
                            <div className={cx('action-btn', 'mt-3')}>
                                <Button type='submit' leftIcon={<FontAwesomeIcon icon={faCheck}/>} className={cx('btn', 'btn-success', 'text-uppercase')}>confirm</Button>
                                <Button type='button' leftIcon={<FontAwesomeIcon icon={faX}/>} onClick={onClose} className={cx('btn', 'btn-danger', 'text-uppercase')}>cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;