const Product = require('../models/productModel');

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save()
}

module.exports = updateStock;