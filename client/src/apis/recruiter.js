import axios from 'axios';
import { backendURL } from './server';

export const getRecruiter = async (id) => {
    try {
        const response = await axios.get(`${backendURL}/api/v1/recruiters/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateRecruiter = async (id, data) => {
    try {
        const response = await axios.put(`${backendURL}/api/v1/recruiters/${id}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
} 

export const createJob = async (data) => {
    try {
        const response = await axios.post(`${backendURL}/api/v1/job`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getJobsOfRecruiter = async (recruiter_id) => {
    try {
        const response = await axios.get(`${backendURL}/api/v1/job/recruiter/${recruiter_id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getJobById = async (id) => {
    try {
        const response = await axios.get(`${backendURL}/api/v1/job/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const updateJob = async (id, data) => {
    try {
        const response = await axios.put(`${backendURL}/api/v1/job/${id}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const stopAcceptingApplications = async (id) => {
    try {
        const response = await axios.get(`${backendURL}/api/v1/job/stop/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllStudentsOfJob = async (id) => {
    try {
        const response = await axios.get(`${backendURL}/api/v1/job/students/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

