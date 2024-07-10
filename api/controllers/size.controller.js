import { errorHandler } from "../utils/error.js";
import Size from '../models/size.model.js';

export const createSize = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to create a size!'))
        }

        const existingSize = await Size.findOne({ sname: req.body.size });
        if (existingSize) {
            return next(errorHandler(403, 'Size already exists!'));
        }

        const newSize = new Size({ sname: req.body.size });
        await newSize.save();
        res.status(201).json(newSize);

    } catch (error) {
        next(error)
    }
};

export const getSizes = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to see the sizes!'))
        }

        const pages = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
        const skip = (pages - 1) * limit;

        const totalSizes = await Size.countDocuments();

        const sizes = await Size.find().skip(skip).limit(limit);
        res.status(200).json({
            sizes,
            currentPage: pages,
            totalPages: Math.ceil(totalSizes / limit),
            totalSizes
        });

    } catch (error) {
        next(error)
    }
};

export const deleteSize = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to delete this size!'))
        }

        await Size.findByIdAndDelete(req.params.id);
        res.status(200).json('The size has been deleted!');

    } catch (error) {
        next(error)
    }
};

export const editSize = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to edit this size!'))
        }

        const size = await Size.findById(req.params.id);
        if (!size) {
            return next(errorHandler(404, 'Size not found!'));
        }

        const editedSize = await Size.findByIdAndUpdate(req.params.id, {
            sname: req.body.size,
        },{new: true});

        res.status(200).json(editedSize);

    } catch (error) {
        next(error)
    }
};