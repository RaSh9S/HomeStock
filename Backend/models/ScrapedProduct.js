const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scrapedProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: String, // Keep as string to support formats like "Rs 140.00"
    required: true,
  },

  source: {
    type: String, // E.g., "Keells", "Cargills"
    required: true,
  },

  imageUrl: {
    type: String, // Optional: Store the product image URL
  },

  scrapedAt: {
    type: Date,
    default: Date.now, // Auto-set when inserted
  }
});

const ScrapedProduct = mongoose.model('ScrapedProduct', scrapedProductSchema);

module.exports = ScrapedProduct;
