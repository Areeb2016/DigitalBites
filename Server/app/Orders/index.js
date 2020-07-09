const express = require("express");
const Router = express.Router();
var OrderController = require("./controller");
const requiretoken = require("../../middleware/requireToken");

Router.get(
	"/report",
	requiretoken,

	OrderController.reportorder
);

Router.get(
	"/Ohistory",
	requiretoken,

	OrderController.OrderHistory
);

Router.get(
	"/",
	requiretoken,

	OrderController.getAllOrders
);

Router.get(
	"/:id",
	requiretoken,

	OrderController.getspecificOrder
);

Router.post(
	"/:id",
	requiretoken,

	OrderController.createOrder
);

Router.patch(
	"/updatestatus/:id",
	requiretoken,

	OrderController.updatestatus
);
Router.patch(
	"/updaterider/:id",
	requiretoken,

	OrderController.updaterider
);
module.exports = Router;
