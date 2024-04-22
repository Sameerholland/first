const { json } = require("express");
const { Cart } = require("../models/Cart");

exports.AddToCart = async (req, res) => {
  console.log("AddToCart API Called");
  try {
    const data = new Cart(req.body);
    const doc = await data.save();
    const result = await doc.populate('product')
    res.status(201).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.GetCart = async (req,res)=>{
  console.log("Get Cart API Called");
  try{
    const cart = await Cart.find({user:req.body.id}).populate('product');
    res.status(200).json(cart)
  }
  catch(err){
    res.status(400).json({error:err.message})
  }
}

exports.UpdateCart = async (req, res) => {
  console.log("UpdateCart API Called", req.body);
  try {
    const data = await Cart.findByIdAndUpdate(
      { _id: req.body.id },
      { quantity: req.body.quantity },
      { new: true }
    );

    const result = await data.populate('product')
    res.status(201).json(result);
  } catch (err) {
    res.status(401), json({ error: err.message });
  }
};
exports.DeleteCart = async (req, res) => {
   console.log("Delete Cart API called")
  try {
    const data = await Cart.findByIdAndDelete({ _id: req.params.id});
    res.status(201).json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
