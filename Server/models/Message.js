const mongoose = require('mongoose');

const Messageschema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    }

,
Message:{
    type:String,
    
}
})
module.exports =mongoose.model('Message',Messageschema);