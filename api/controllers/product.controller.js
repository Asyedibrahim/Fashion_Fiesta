import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const createProduct = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to create a product!'))
        }

        const imagePaths = req.files.map(file => file.path);

        const newProduct = new Product({
            ...req.body,
            images: imagePaths,
            userId: req.user.id
        });
        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to see products!'))
        }

        const products = await Product.find();
        res.status(200).json(products);
        
    } catch (error) {
        next(error)
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to delete this product!'))
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted!');
        
    } catch (error) {
        next(error)
    }
};