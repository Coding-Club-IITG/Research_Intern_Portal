import { roles } from '../utils/roles.js';
import User from './model';
import Student from '../students/models/student';
import Recruiter from '../recruiter/models/jobs';
import Admin from '../admin/models/admin';

export const createUser = async (data) => {
    try {
        const { name, email, role } = data;

        const user = await User.create({
            name,
            email,
            role,
        });

        if(role === roles.STUDENT){
            const student = await Student.create({
                name,
                email,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }else if(role === roles.RECRUITER){
            const recruiter = await Recruiter.create({
                name,
                email,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }else if(role === roles.ADMIN){
            const admin = await Admin.create({
                name,
                email,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export const getUserFromToken = async function (accessToken) {
    try {
        const config = {
            method: "get",
            url: "https://graph.microsoft.com/v1.0/me",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axios(config);

        const userData = {
            name: response.data.displayName,
            email: response.data.mail,
            rollNumber: response.data.surname,
            branch: response.data.jobTitle
        };

        return userData;
    } catch (error) {
        console.error('Error fetching user information:', error);
        return null;
    }
};
