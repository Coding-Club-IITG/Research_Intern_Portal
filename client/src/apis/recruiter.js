import axios from 'axios';

export const getRecruiter = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/recruiters/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateRecruiter = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/v1/recruiters/${id}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
} 

