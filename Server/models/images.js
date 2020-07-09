// const mongoose = require("mongoose")
// const Schema = mongoose.Schema;

// const WishSchema = Schema({
//     wish:String
// });

// mongoose.model("wishes",WishSchema)

const monggose= require('mongoose')


const imageSchema= monggose.Schema({
    
    image:String
})



module.exports = monggose.model("imageSchema",imageSchema)