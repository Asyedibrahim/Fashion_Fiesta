import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || email === '' || password === '') {
            return next(errorHandler(400, 'All fields are required'));
        };

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(200).json("User created successfully!");

    } catch (error) {
        if (error.code === 11000) {
            next(errorHandler(403, 'Email already registered!'))
        } else {
            next(error);
        }
    }
}