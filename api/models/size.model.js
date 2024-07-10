import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    sname: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Size = mongoose.model('Size', sizeSchema);

export default Size;