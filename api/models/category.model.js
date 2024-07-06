import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    cname: {
        type: String,
        required: true,
        unique: true
    },
    containSize: {
        type: Boolean,
        default: true
    }
}, { timestamps:true });

const Category = mongoose.model('Category', categorySchema);

export default Category;