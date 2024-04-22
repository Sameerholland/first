const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   quantity:{type:Number,required:true},
   product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
   user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
   Address:{type:mongoose.Schema.Types.ObjectId, ref:'Address', required:true},
   Price:{type:Number,required:true},
   discount:{type:Number},
   order_date:{type:Date,required:true},
   Dilervery_date:{type:Date,required:true},
   payment_method:{type:String, required:true},
   status:{type:String,required:true}
})

exports.Order = mongoose.model('Order',OrderSchema);