import axios from '../api/axios';

const END_POINTS = {
    GET_ALL: '/Member/getAll',
    EDIT: '/Member/edit',
};

export const getAllMembersApi = () => {
    return axios.get(END_POINTS.GET_ALL);
};

export const editProfileApi = (data) => {
    return axios.put(END_POINTS.EDIT, null, { params: data });
};
