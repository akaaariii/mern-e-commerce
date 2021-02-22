const products = require('../data/products');

exports.getAll = (req, res) => {
  res.json(products)
};

exports.show = (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
};