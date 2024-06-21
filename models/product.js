const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        enum: ['Pain Relief', 'Cold and Flu', 'Allergy', 'Digestive Health', 'Others'],
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reviews",
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
