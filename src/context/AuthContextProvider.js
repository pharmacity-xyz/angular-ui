import React, { useReducer } from 'react';
import { LS } from '../utils';

export const AuthContext = React.createContext();
export const AUTH_ACTION = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};
const initialState = {
    isLoggedIn: false,
    member: LS.getLocalStorage('auth')?.member || {},
    role: LS.getLocalStorage('auth')?.role || null,
    openAuthModal: false,
};
function authReducer(state, action) {
    switch (action.type) {
        case AUTH_ACTION.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                ...action.payload,
            };
        case AUTH_ACTION.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                role: null,
            };
        case AUTH_ACTION.OPEN_MODAL:
            return { ...state, openAuthModal: true };
        case AUTH_ACTION.CLOSE_MODAL:
            return { ...state, openAuthModal: false };
        default:
            return state;
    }
}
function AuthContextProvider({ children }) {
    const [authState, dispatch] = useReducer(authReducer, initialState);
    return <AuthContext.Provider value={[authState, dispatch]}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
