import axios from '../api/axios'

const END_POINTS = {
    SIGN_UP: 'auth/register',
    LOG_IN: 'auth/login',
    LOGGED_MEMBER: 'auth/loggedMember',
    CHANGE_PASSWORD: 'auth/changePassword',
}

export const signUpApi = (data) => {
    return axios.post(END_POINTS.SIGN_UP, data)
}

export const logInApi = (data) => {
    return axios.post(END_POINTS.LOG_IN, data)
}


export const loggedMemberApi = () => {
    return axios.get(END_POINTS.LOGGED_MEMBER)
}

export const changePasswordApi = (data) => {
    return axios.post(END_POINTS.CHANGE_PASSWORD, null, {params:data})
}