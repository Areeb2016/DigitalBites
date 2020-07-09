var mongoose = require('mongoose');

var foodreviewSchema = new mongoose.Schema({
    rating: Number,
    reviews:String,
    reviewby:String
    

});

module.exports = mongoose.model("foodreview", foodreviewSchema);