import axios from '../api/axios'

const END_POINTS = {
    GET_ALL: 'Category/GetAll',
    ADD: 'Category/Add',
    DELETE: 'Category/Delete',
    UPDATE: 'Category/Update', 
}

export const GetAllCategoriesApi = () => {
    return axios.get(END_POINTS.GET_ALL);
}

export const AddCategoryApi = (data) => {
    return axios.post(END_POINTS.ADD, data);
}

export const DeleteCategoryApi = (id) => {
    return axios.delete(`${END_POINTS.DELETE}/${id}`)
}

export const UpdateCategoryApi = (data) => {
    return axios.put(END_POINTS.UPDATE, data);
}