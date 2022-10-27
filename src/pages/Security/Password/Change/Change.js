import { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Change.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../../../../components/Button';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { changePasswordApi } from '../../../../services/authService';

const cx = classNames.bind(styles);

function Change() {
    const [authState] = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const [
            { value: email },
            { value: password },
            { value: newPassword },
            { value: confirmNewPassword },
        ] = e.target;
        const data = { email, password, newPassword, confirmNewPassword };
        try {
            await changePasswordApi(data);
            toast.success('Change password successfully!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data);
            toast.error(`${errorMessage}!`, {
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3', 'mt-4')}>
                    <div className={cx('avatar', 'd-flex', 'flex-column', 'align-items-center')}>
                        <div
                            className={cx(
                                'user-icon-wrapper',
                                'd-flex',
                                'align-items-center',
                                'justify-content-center'
                            )}
                        >
                            <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                        </div>
                        <span className={cx('email', 'mt-3')}>username</span>
                    </div>
                </div>
                <div className={cx('col-lg-9', 'mt-4')}>
                    <div className={cx('info')}>
                        <h1 className={cx('title')}>Change Password</h1>
                        <form
                            className={cx('profile-form', 'mt-4')}
                            onSubmit={handleChangePassword}
                        >
                            <div
                                className={cx(
                                    'input-group',
                                    'd-flex',
                                    'flex-column',
                                    'mt-3',
                                    'mb-3'
                                )}
                            >
                                <label
                                    htmlFor="email"
                                    className={cx('input-label', 'mt-2', 'mb-2')}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={cx('input-text')}
                                    id="email"
                                    value={authState.member.email}
                                    readOnly
                                />
                            </div>
                            <div
                                className={cx(
                                    'input-group',
                                    'd-flex',
                                    'flex-column',
                                    'mt-3',
                                    'mb-3'
                                )}
                            >
                                <label
                                    htmlFor="old-password"
                                    className={cx('input-label', 'mt-2', 'mb-2')}
                                >
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    className={cx('input-text')}
                                    id="old-password"
                                />
                            </div>
                            <div
                                className={cx(
                                    'input-group',
                                    'd-flex',
                                    'flex-column',
                                    'mt-3',
                                    'mb-3'
                                )}
                            >
                                <label
                                    htmlFor="new-password"
                                    className={cx('input-label', 'mt-2', 'mb-2')}
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className={cx('input-text')}
                                    id="new-password"
                                />
                            </div>
                            <div
                                className={cx(
                                    'input-group',
                                    'd-flex',
                                    'flex-column',
                                    'mt-3',
                                    'mb-3'
                                )}
                            >
                                <label
                                    htmlFor="confirm-new-password"
                                    className={cx('input-label', 'mt-2', 'mb-2')}
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className={cx('input-text')}
                                    id="confirm-new-password"
                                />
                            </div>
                            <Button
                                type="submit"
                                primary
                                className={cx('save-btn', 'd-block', 'text-uppercase')}
                            >
                                Save
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Change;
