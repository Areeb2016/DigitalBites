const mongoose = require('mongoose');

const Categories = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    type: String
  },
  createdBy: {
    type: String,
  }

});

module.exports = mongoose.model('Categories', Categories);