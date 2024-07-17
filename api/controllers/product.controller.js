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
            sizes: req.body.sizes.split(','),
            tags: req.body.tags.split(','),
            userId: req.user.id
        });
        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
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

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return next(errorHandler(404, 'Product not found!'));
        }
        res.status(200).json(product);

    } catch (error) {
        next(error)
    }
};

export const editProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return next(errorHandler(404, 'Product not found!'));
        }

        if (req.user.id !== product.userId.toString()) {
            return next(errorHandler(403, 'You are not allowed to edit this product!'))
        }

        const imagePaths = req.files ? req.files.map(file => file.path) : [];

        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.category = req.body.category || product.category;
        product.sizes = req.body.sizes || product.sizes;
        product.quantity = req.body.quantity || product.quantity;
        product.regularPrice = req.body.regularPrice || product.regularPrice;
        product.discountPrice = req.body.discountPrice || product.discountPrice;
        product.vendor = req.body.vendor || product.vendor;
        product.tags = req.body.tags || product.tags;
        product.trending = req.body.trending || product.trending;

        if (req.body.deletedImages && req.body.deletedImages.length > 0) {
            const deletedImages = JSON.parse(req.body.deletedImages);
            product.images = product.images.filter(image => !deletedImages.includes(image));
          }

        if (imagePaths.length > 0) {
            product.images = [...product.images, ...imagePaths];
        }

        const editedProduct = await product.save();

        res.status(200).json(editedProduct);

    } catch (error) {
        next(error);
    }
};
