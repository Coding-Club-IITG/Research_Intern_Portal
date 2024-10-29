import axios from 'axios';
import { backendURL } from './server';

export const getAllAcceptingJobs = async (navigate)=>{
    try {
        const response = await axios.get(`${backendURL}/api/v1/job/open-jobs`);
        return response.data;
    } catch (error) {
        navigate('/500');
        return error?.response?.data || error;
    }
}