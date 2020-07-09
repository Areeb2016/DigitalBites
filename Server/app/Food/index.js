const express = require("express");
const Router = express.Router();
var FoodController = require("./controller");
const requiretoken = require("../../middleware/requireToken");

Router.post("/foodreview/:id", requiretoken, FoodController.foodRating);
Router.get(
	"/category",
	requiretoken,

	FoodController.viewcategory
);
Router.get("/countreport", requiretoken, FoodController.countreport);
Router.get("/", requiretoken, FoodController.getAllFood);
Router.get("/report", requiretoken, FoodController.reportfood);
Router.get(
	"/:id",

	FoodController.getspecificFood
);
/* POST New food */
Router.post(
	"/",
	requiretoken,

	FoodController.createFood
);

/* Deletes a Food By ID */
Router.delete(
	"/delete/:id",
	requiretoken,
	//
	FoodController.deleteFoodById
);

/* Updates a Food */
Router.patch(
	"/update/:id",
	requiretoken,

	FoodController.updateFoodById
);

/* GET all Food or get food by id*/
Router.get(
	"/types",

	FoodController.getFoodType
);
Router.post(
	"/category",
	requiretoken,

	FoodController.addcategory
);

module.exports = Router;
