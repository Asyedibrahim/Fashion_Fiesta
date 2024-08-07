import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || email === '' || password === '') {
            return next(errorHandler(400, 'All fields are required!'));
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
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || email === '' || password === '') {
            next(errorHandler(400, 'All fields are required!'))
        }

        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(404, 'User not found!'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(404, 'Invalid password!'))
        }

        const token = jwt.sign({ id: validUser._id,isAdmin: validUser.isAdmin }, process.env.JWT_SECRET, {expiresIn: '7d'})

        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
        .status(200)
        .json(rest)

    } catch (error) {
        next(error)
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {expiresIn: '7d'});
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
            .status(200)
            .json(rest)

        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({ 
                email: req.body.email, 
                password: hashedPassword 
            });

            await newUser.save();
            
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            res.cookie('access_token', token, {httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
            .status(200)
            .json(rest);
        }
    } catch (error) {
        next(error)
    }
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User sign out successfully!');
    } catch (error) {
        next(error)
    }
};