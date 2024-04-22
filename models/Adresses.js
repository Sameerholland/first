const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
   user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
   Street:{type:String,required:true},
   State:{type:String,required:true},
   district:{type:String, required:true},
   ZipCode:{type:Number, required:true},
   Primary_contact_Number:{type:Number, required:true},
   Secondary_contact_Number:{type:Number}
},{timestamps:true})

exports.Address = mongoose.model("Address",AddressSchema);