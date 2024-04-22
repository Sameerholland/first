const { Product } = require("../models/Product");

//API TO Add New Product
exports.AddProducts = async (req, res) => {
  console.log("Add Product API called");
  try {
    const products = new Product(req.body);
    const doc = await products.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

//API TO Fetch All Products

exports.FetchAllProducts = async (req, res) => {
  console.log("Get ALL Product API Product Called");

  let condition = {};
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  const totalDocs = await totalProductsQuery.count().exec();

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json({ product: docs, totalitem: totalDocs });
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.FetchProductsByCategory = async (req, res) => {
  console.log("Fetch Product by category API Product Called");

  let condition = {};
  let query = Product.find(condition);
  if (req.body.category) {
    query = query.find({ category: { $in: req.body.category.split(",") } });
  }
  query = query.limit(8);
  try {
    const docs = await query.exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};
//API TO Fetch Product By ID
exports.FetchProductByID = async (req, res) => {
  console.log("Fetch Product by ID API Called");
  try {
    const produ = await Product.findById({ _id: req.body.id });
    res.status(200).json(produ);
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};
