const mongoose = require('mongoose');
const menuitemSchema =new  mongoose.Schema({
    name :{
        type : String,
        required : true,
    },  price :{
        type : Number,
        required : true,
    },  taste :{
        type : [String],
        enum : ['spicy','salty','sweet'],
        required : true,
    },  is_drink :{
        type : Boolean,
        required : true,
        default : false
    },  ingredients :{
        type : String,
        required : true,
    },  num_sales :{
        type : [String],
        required : true,
        default : 0
    },

});

const menuitem = mongoose.model('menuitem',menuitemSchema);
module.exports = menuitem;