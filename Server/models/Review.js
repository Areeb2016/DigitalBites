var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
      },
      reviews: {
        type: String,
        required: true
      },
    reviewby:String
    

});

module.exports = mongoose.model("Review", ReviewSchema);