import { errorHandler } from "../utils/error.js";
import Category from '../models/category.model.js';

export const createCategory = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to create a category!'))
        }

        const newCategory = new Category({ cname: req.body.cname });
        await newCategory.save();
        res.status(201).json(newCategory);

    } catch (error) {
        if (error.code === 11000) {
            next(errorHandler(403,'Category already exists!'))
        }
        next(error)
    }
};

export const getCategories = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to see the categories!'))
        }

        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {
        next(error)
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to delete this category!'))
        }

        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json('The category has been deleted!');

    } catch (error) {
        next(error)
    }
};

export const editCategory = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to edit this category!'))
        }

        const category = await Category.findById(req.params.id);
        if (!category) {
            return next(errorHandler(404, 'Category not found!'));
        }

        const editedCategory = await Category.findByIdAndUpdate(req.params.id, {
            cname: req.body.cname, 
        },{new: true});

        res.status(200).json(editedCategory);

    } catch (error) {
        next(error)
    }
};