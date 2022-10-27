import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AuthForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';

import { AuthContext, AUTH_ACTION } from '../../context/AuthContextProvider';
import { signUpApi, logInApi, loggedMemberApi } from '../../services/authService';
import { getAllMembersApi } from '../../services/memberService';
import { LS } from '.././../utils/localStorage';
import config from '../../config';

const cx = classNames.bind(styles);
function AuthFrom({ type }) {
    const [members, setMembers] = useState([]);
    const [authState, dispatch] = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllMembers = async () => {
            const members = await getAllMembersApi();
            setMembers(members);
        };
        getAllMembers();
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const [{ value: email }, { value: password }] = e.target;
        const data = { email, companyName: '', city: '', country: '', password, role: 'USER' };
        try {
            if (email === '' && password === '') {
                toast.error('Email and password cannot be empty!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                dispatch({ type: AUTH_ACTION.CLOSE_MODAL });
            } else if (email === '') {
                toast.error('Email cannot be empty!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                dispatch({ type: AUTH_ACTION.CLOSE_MODAL });
            } else if (password === '') {
                toast.error('Password cannot be empty!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                dispatch({ type: AUTH_ACTION.CLOSE_MODAL });
            } else if (
                members.some(
                    (member) => member.email.toLowerCase().trim() === email.toLowerCase().trim()
                )
            ) {
                toast.error(`Email '${email.trim()}' has already existed!`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                dispatch({ type: AUTH_ACTION.CLOSE_MODAL });
            } else {
                await signUpApi(data);
                dispatch({ type: AUTH_ACTION.CLOSE_MODAL });
                toast.success('Sign up successfully!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const [{ value: email }, { value: password }] = e.target;
        const data = { email, companyName: '', city: '', country: '', password, role: '' };
        try {
            const response = await logInApi(data);
            console.log(response);
            const authData = { member: {}, role: response.role };
            const member = await loggedMemberApi();
            authData.member = member;
            LS.setLocalStorage('auth', authData);
            dispatch({
                type: AUTH_ACTION.LOGIN,
                payload: authData,
            });
            if (response.role === config.roles.ADMIN) navigate('/admin');
            LS.setLocalStorage('auth', authData);
            dispatch({ type: AUTH_ACTION.CLOSE_MODAL });
            toast.success('Log in successfully!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        } catch (error) {
            console.log(error.response.data);
            // setErrorMessage(error.response.data);
            toast.error(`${error.response.data}!`, {
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
        <form
            action=""
            id={cx(`${type}-form`)}
            onSubmit={type === 'signup' ? handleSignUp : handleSignIn}
        >
            <h2 className={cx('title')}>{type === 'signup' ? 'Sign up' : 'Log in'}</h2>
            <div className={cx('input-group')}>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
            </div>

            <div className={cx('input-group')}>
                <label>Password</label>
                <input type="password" placeholder="Enter your password" />
            </div>
            <div id="button" className={cx('input-group')}>
                <button
                    type="submit"
                    className={
                        type === 'signup'
                            ? cx('btn', 'btn-success', 'mb-5')
                            : cx('btn', 'btn-primary')
                    }
                >
                    {type === 'signup' ? 'Sign up' : 'Log in'}
                </button>
            </div>
            {type === 'login' ? (
                <div id={cx('alternativeLogin')}>
                    <label>Or sign in with:</label>
                    <div className={cx('icon-group')}>
                        <a href="/" className="icon-link">
                            <FontAwesomeIcon id={cx('facebook')} icon={faFacebook} />
                        </a>
                        <a href="/" className="icon-link">
                            <FontAwesomeIcon id={cx('twitter')} icon={faTwitter} />
                        </a>
                        <a href="/" className="icon-link">
                            <FontAwesomeIcon id={cx('google')} icon={faGoogle} />
                        </a>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </form>
    );
}

export default AuthFrom;
