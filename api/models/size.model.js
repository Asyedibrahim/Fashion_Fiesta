import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    sizes: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const Size = mongoose.model('Size', sizeSchema);

export default Size;