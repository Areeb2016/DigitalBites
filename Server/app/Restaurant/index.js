const express = require('express')
const Router = express.Router();

const requireToken = require('../../middleware/requireToken')
var RestaurantController = require('./controller');
// 1: [Get Restaurant Locations Report [ADMIN]]
Router.get('/Lreport', requireToken,
  RestaurantController.Lreport
);
Router.get('/statusreport',
  RestaurantController.statusreport
);


Router.get('/countreport', requireToken,
  RestaurantController.countreport
);
// 2: [Get All RESTAURANTS : [ADMIN + USER]]
Router.get('/R', requireToken,
  RestaurantController.getAllRestaurants
);

// 3: [Get SPECIFIC RESTAURANT DETAILS :[ADMIN + USER]]]
Router.get('/:id',
  RestaurantController.getSpecificRestaurant
);
// 4: [POST Restaurant RATING :[USER]]
Router.post('/product/:id', requireToken,
  RestaurantController.createRating
);

// 5: [UPDATE RESTAURANT DETAILS :[ADMIN]]
Router.patch('/update/:id', requireToken,
  RestaurantController.updateRestaurantById
);
// 6: [CREATE RESTAURANT :[ADMIN]]
Router.post('/', requireToken,
  RestaurantController.createRestaurant
);

// 7: [DELETE RESTAURANT :[ADMIN]]
Router.delete('/delete/:id', requireToken,

  RestaurantController.deleteRestaurant
);

Router.patch('/status/:id', requireToken,
  RestaurantController.changestatus
);

// 8 :[VIEW ALL RESTAURANTS] :[SUPER ADMIN]]
Router.get('/',
  RestaurantController.superadmin
);
// 9 :[VIEW SPECIFIC  RESTAURANTS] :[SUPER ADMIN]]
Router.get('/super/:id',
  RestaurantController.getSpecificRestaurant
);
// 10 :[UPDATE RESTAURANT STATUS] :[SUPER ADMIN]]
Router.patch('/confirm/:id',
  RestaurantController.updateRestaurantstatus
);


module.exports = Router;



