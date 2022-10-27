import axios from '../api/axios'

const END_POINTS = {
    GET_ALL: 'Product/GetAll',
    GET_BY_ID: 'Product/GetById',
    GET_BY_CATEGORY: 'Product/GetByCategory',
    ADD: '/Product/Add',
    UPDATE: '/Product/Update',
    DELETE: '/Product/Delete',
}

export const GetAllProductsApi = () => {
    return axios.get(END_POINTS.GET_ALL);
}

export const GetProductByIdApi = (id) => {
    return axios.get(`${END_POINTS.GET_BY_ID}/${id}`)
}

export const GetProductsByCategoryApi = (id) => {
    return axios.get(`${END_POINTS.GET_BY_CATEGORY}/${id}`);
}

export const AddProductApi = (data) => {
    return axios.post(END_POINTS.ADD, data);
}

export const UpdateProductApi = (data) => {
    return axios.put(END_POINTS.UPDATE, data);
}

export const DeleteProductApi = (id) => {
    return axios.delete(`${END_POINTS.DELETE}/${id}`);
}