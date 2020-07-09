const Food = require('./model');
const Reservation = require('./model'); 
const Nexmo = require('nexmo');
const createReservation = function (req, res, next) {
  
  console.log(req.user._id)

  var reservation = new Reservation({
    name: req.body.name,
    Mobileno:req.body.mobileno,
    Date:req.body.chosenDate,
    Time:req.body.time,
    Tpeoples:req.body.selected,
    reserveBy:req.user._id
   
})
console.log(reservation)

  
reservation.save(function(error) {
  if (!error) {
      Reservation.find({}).
      populate('reserveBy')
          
     .exec(function(error, reservations) {
              console.log(JSON.stringify(reservations, null, "\t"))
          })
  }
});

  
  
};

const getAllReservations = function (req, res, next) {
 
  Reservation
  .find()
  .exec()
  .then(reservation => res.json(reservation))
  .catch(e => next(e));
};



const getspecificReservation=function (req, res, next){
  let id = req.params.id
  console.log(id)
 
  Reservation
  .findById(id)
  .exec()
  .then(food => res.json(food))
  .catch(err => next(err));
}

// // Updates Food By id
const confirmstatus = function (req, res, next) {
 let reserveId = req.params.id;
 
 
 const nexmo = new Nexmo({
  apiKey: 'bbc69f5d',
  apiSecret: 'xub7gDQDduWJnKRV',
});
const number = req.body.Mobileno;
console.log(number)
const text = "Your Reservation "+" "+req.params.id+"has been confirmed";
console.log(text)
const from = 'Nexmo';


//nexmo.message.sendSms(from, number, text)

  Reservation
    .findById(reserveId,function(err,data){
      if (!data)
      res.status(404).send('data is not found');
  
    else{
      
data.status= req.body.status
   
   


 
    data
    .save()
    .then(reservation => res.json("status updated"))
     .catch(err => next(err));



    }
  })
  

};

const cancelstatus = function (req, res, next) {
  let reserveId = req.params.id;
 
  const nexmo = new Nexmo({
    apiKey: 'bbc69f5d',
    apiSecret: 'xub7gDQDduWJnKRV',
  });
  const number = req.body.Mobileno;
  console.log(number)
  const text = "Your Reservation"+" "+req.params.id+"has been cancelled";
  console.log(text)
  const from = 'Nexmo';

   Reservation
     .findById(reserveId,function(err,data){
       if (!data)
       res.status(404).send('data is not found');
   
     else{
      
 data.status= req.body.status
    
    
 
 
  
     data
     .save()
     .then(reservation => res.json("status updated"))
      .catch(err => next(err));
 
 
 
     }
   })
   
 
 };






module.exports = {
  createReservation,
  getAllReservations,
  getspecificReservation,
  confirmstatus,
  cancelstatus
  
};