const express = require('express')
const Router = express.Router();  
var RiderController = require('./controller');
const requiretoken=require('../../middleware/requireToken')
const ridertoken=require('../../middleware/riderToken')
 /* POST New Rider */
 Router.get('/myorders',ridertoken,
    
 RiderController.riderorders
);
  Router.post('/',requiretoken,
   
  RiderController.createRider
  );
 
/* Get All Rider */
  Router.get('/', requiretoken,
    
   RiderController.getAllRiders
  );

  Router.get('/:id',requiretoken,
  
  RiderController.getspecificrider
);
Router.patch('/update/:id',requiretoken,
RiderController.updaterider
);
Router.delete('/delete/:id',requiretoken,
  
RiderController.deleterider
);

  Router.post ('/signin', 
    
  RiderController.Login
 );




  

module.exports = Router;