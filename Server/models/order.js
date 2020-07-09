const mongoose = require('mongoose');

const Orders = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  items: {
    type: 'Object',
    require: true,
  },
  totalCost: {
    type: Number,
   
  }
});

module.exports = mongoose.model('Orders', Orders);