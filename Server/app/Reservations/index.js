const express = require('express')
const Router = express.Router();  
var ReservationController = require('./controller');
const requiretoken=require('../../middleware/requireToken')


Router.get('/reservationreport',requiretoken,

  ReservationController.reportreservations
);
  
  Router.get('/',requiretoken,
   
  ReservationController.getAllReservations
  );

  Router.get('/Rhistory',requiretoken,
   
  ReservationController.ReservationHistory
  );
//   Router.get('/report',
   
// );
  Router.get('/:id',requiretoken,
  
  ReservationController. getspecificReservation
);
 
  Router.post('/:id',requiretoken,
   
    ReservationController.createReservation
  );

  

  // /* Deletes a Food By ID */
  // Router.delete('/delete/:id',requiretoken,
  //   //
  //   FoodController.deleteFoodById
  // );
  
  // /* Updates a Food */
  Router.patch('/update/:id',requiretoken,
    
    ReservationController.confirmstatus
  );
  Router.patch('/cancel/:id',requiretoken,
    
  ReservationController.cancelstatus
);
  // /* GET all Food or get food by id*/
  // Router.get('/types', 
    
  //   FoodController.getFoodType
  // );

  

module.exports = Router;