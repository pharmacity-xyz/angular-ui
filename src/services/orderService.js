import axios from '../api/axios'

const END_POINTS = {
    GET_ALL: '/Order/GetAllOrder',
    GET_BY_MEMBER_ID: '/Order/GetAllMemberOrder',
    POST_ORDER: '/Order/AddOrder',
    DELETE_ORDER: '/Order/Delete',
}

export const getAllOrdersApi = () => {
    return axios.get(END_POINTS.GET_ALL);
}

export const getAllOrdersByMemberApi = (id) => {
    return axios.get(`${END_POINTS.GET_BY_MEMBER_ID}/${id}`);
}

export const postOrderApi = (data) => {
    return axios.post(END_POINTS.POST_ORDER, data);
}

export const deleteOrderApi = (id) => {
    return axios.delete(`${END_POINTS.DELETE_ORDER}/${id}`);
}