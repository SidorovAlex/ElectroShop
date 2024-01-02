const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description."]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price."],
        max: [ 1000000 , "Price Can't Exceed 1 milion"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category."]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        max: [1000 , "Product Stock Can't Exceed 1000."],
        default: 1,
        min: 0
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Products", productSchema);

module.exports = Product;