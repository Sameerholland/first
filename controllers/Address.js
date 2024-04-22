const { Address } = require("../models/Adresses");

exports.AddAddress = async (req, res) => {
  console.log("Add Address API Called");
  try {
    const data = new Address(req.body);
    const doc = await data.save();
    const result = await doc.populate({path:'user', select:"username"});
    res.status(201).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.fetchAddress = async (req, res) => {
  console.log("Fetch Address API Called");
  try {
    const address = await Address.find({ user: req.body.id }).populate({path:'user', select:"username"});
    res.status(200).json(address);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.DeleteAddress = async (req, res) => {
  console.log("Delete Address Called");
  try {
    const data = await Address.findByIdAndDelete({ _id: req.params.id});
    res.status(201).json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
