const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName : {
        type : String,
        required: true
    },

    category : {
        type : String,
        required: true
    },

    quentity : {
        type : Number,
        required: true
    },
 
    MfdDate: {
        type: Date,
        required: true
    },

    ExpDate: {
        type: Date,
        required: true
    },

    minThreshold: {         
        type: Number,
        required: true,
        default: 1            // default minimum quantity
    }
})

const inventoryItems = mongoose.model("Inventory_Items",itemSchema);

module.exports = inventoryItems;
