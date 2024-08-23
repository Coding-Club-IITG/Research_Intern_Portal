import User from './model';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

