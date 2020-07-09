const Order = require("./model");
const Rider = require("../Riders/model");
const Restaurant = require("../Restaurant/model");
var moment = require("moment");
const reportorder = function (req, res, next) {
	console.log("Order Report");
	const { product } = req.headers;
	if (product === "daily") {
		var datelimit = moment().subtract(24, "hour").format();
	} else if (product === "weekly") {
		var datelimit = moment().subtract(7, "days").format();
	} else if (product === "monthly") {
		var datelimit = moment().subtract(30, "days").format();
	} else {
		var datelimit = moment().subtract(1, "year").format();
	}

	const aggregatorOpts = [
		{
			$match: {
				createdAt: {
					$gte: new Date(datelimit),
					$lte: new Date(moment().format()),
				},
			},
		},
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
			},
		},
	];

	Order.aggregate(aggregatorOpts)
		.exec()
		.then((status) => res.json(status))
		.catch((err) => next(err));
};

const createOrder = function (req, res, next) {
	var orders = new Order({
		items: req.body.order,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		createdBy: req.user.email,
		rname:req.body.rname,
		rowner:req.body.rowner
	});

console.log(req.body);

	orders
		.save()
		.then(function (dbProduct) {
			res.send("Order Successfully Created");
		})
		.catch(function (err) {
			res.json(err);
		});
};

const getspecificOrder = function (req, res, next) {
	let id = req.params.id;

	Order.findById(id)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};
// Updates Food By id
const updatestatus = function (req, res, next) {
	let orderid = req.params.id;

	Order.findById(orderid, function (err, data) {
		if (!data) res.status(404).send("data is not found");
		else {
			data.status = req.body.status;
			console.log(req.body.status);

			data.save()
				.then((food) => res.json("STATUS updated"))
				.catch((err) => next(err));
		}
	});
};
const updaterider = function (req, res, next) {
	let orderid = req.params.id;

	Order.findById(orderid, function (err, data) {
		if (!data) res.status(404).send("data is not found");
		else {
			data.assighnedto = req.body.assighnedto;

			data.save()
				.then((food) => res.json("Order updated"))
				.catch((err) => next(err));
		}
	});

	Rider.findOneAndUpdate(
		{ name: req.body.assighnedto },
		{
			$push: {
				Orders: {
					order: orderid,
				},
			},
		},

		{ new: true }
	)

		.then(function (dbProduct) {})
		.catch(function (err) {
			res.json(err);
		});
};
const getAllOrders = function (req, res, next) {
	Order.find()
		.exec()
		.then((orders) => res.json(orders))
		.catch((e) => next(e));
};
const OrderHistory = function (req, res, next) {
	console.log(req.user.email);

	Order.find({ createdBy: req.user.email })
		.exec()
		.then((orders) => res.json(orders))
		.catch((e) => next(e));
};
module.exports = {
	createOrder,
	getspecificOrder,
	getAllOrders,
	reportorder,
	OrderHistory,
	updatestatus,
	updaterider,
};
