
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   title:{type:String,required:true, unique:true},
   description:{type:String,required:true},
   price:{type:Number,required:true, },
   discountPercentage:{type:Number,required:true},
   reviews:{type:Number, default:0},
   rating:{type:Number,min:[0,"rating can't less than 0"],max:[5,"rating can't more than 5"], default:0},
   stock:{type:Number,min:[0,"Stock can't less than 0"]},
   brand:{type:String,required:true},
   category:{type:String,required:true},
   thumbnail:{type:String,required:true},
   images:{type:[String],required:true}
},{timestamps:true});

exports.Product = mongoose.model('Product', ProductSchema);
