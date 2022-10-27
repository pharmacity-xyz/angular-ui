import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../../components/Button';

import { editProfileApi } from '../../services/memberService';
import { loggedMemberApi } from '../../services/authService';

const cx = classNames.bind(styles);

function Profile() {
    const [member, setMember] = useState({});
    const [company, setCompany] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);

    //Get Logged Member
    useEffect(() => {
        const getLoggedMember = async () => {
            const member = await loggedMemberApi();
            setMember(member);
            setCompany(member.companyName);
            setCity(member.city);
            setCountry(member.country);
        };
        getLoggedMember();
    }, []);

    //update profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await editProfileApi({
                newCompany: company,
                newCity: city,
                newCountry: country,
            });
            toast.success('Update your profile successfully!', {
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
                        <span className={cx('email', 'mt-3')}>{member.email}</span>
                    </div>
                </div>
                <div className={cx('col-lg-9', 'mt-4')}>
                    <div className={cx('info')}>
                        <h1 className={cx('title')}>Profile</h1>
                        <form className={cx('profile-form', 'mt-4')} onSubmit={handleUpdateProfile}>
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
                                    value={member.email}
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
                                    htmlFor="company"
                                    className={cx('input-label', 'mt-2', 'mb-2')}
                                >
                                    Company
                                </label>
                                <input
                                    type="text"
                                    className={cx('input-text')}
                                    id="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
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
                                    htmlFor="country"
                                    className={cx('input-label', 'mt-2', 'mb-2')}
                                >
                                    Country
                                </label>
                                <input
                                    type="text"
                                    className={cx('input-text')}
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
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
                                <label htmlFor="city" className={cx('input-label', 'mt-2', 'mb-2')}>
                                    City
                                </label>
                                <input
                                    type="text"
                                    className={cx('input-text')}
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
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

export default Profile;
