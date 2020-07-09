const mongoose = require('mongoose');

const Rider= new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  password
  :{ type: String,
    require:true
  },
 Phonenumber:{
    type:String
  }
  ,
  transport:{
    type:String
  },
  Address:{
    type:String
  },
  createdBy: {
    type:String,
   
  },
  createdAt:
 {type: Date, default: Date.now},
 
  isavailabe:{
    type:String,
    default:"yes"
    
  }
,
rname:{
  type:String
},
  Orders:[{
    order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Orders',
        }
    }]
  
});

module.exports = mongoose.model('Rider', Rider);