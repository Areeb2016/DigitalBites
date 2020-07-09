const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema({
    name:{
        type:String,
       
        required:true
    },
    Mobileno:{
        type:Number,
      min:11
      
    },

Date:{
    type:Date
    
},
Time:{

    type:String
},
Tpeoples:{

    type:Number
},
reserveBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
})





module.exports = mongoose.model('Reserve',reserveSchema);