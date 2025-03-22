const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    itemName : {
        type : String,
        required: true
    },

    category : {
        type : String,
        required: true
    },

    quentity : {
        type : String,
        required: true
    }
 
    
})

const shoppingList = mongoose.model("shoppingListItem",shoppingListSchema);

module.exports = shoppingList;
