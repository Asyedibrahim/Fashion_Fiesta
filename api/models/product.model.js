import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
    name: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
    },
    quantity: {
        type: Number,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array
    },
    trending: {
        type: Boolean,
        default: false,
    },
    productRating: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;