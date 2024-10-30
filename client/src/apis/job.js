import axios from 'axios';
import { backendURL } from './server';

export const getAllAcceptingJobs = async (navigate) => {
    try {
        const response = await axios.get(`${backendURL}/api/v1/job/internship/accepting`);
        return response.data;
    } catch (error) {
        navigate('/500');
        return error?.response?.data || error;
    }
}

export const handleSubmit = async (job_id, user_id) => {
    try {
        const response = await axios.post(`${backendURL}/api/apply`, {
            job_id,
            user_id
        });
        if (response.status === 200) {
            alert(response.data.message);
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error("Error applying for job:", error);
        alert(error.response?.data?.message || "Server error. Please try again later.");
    }
};

