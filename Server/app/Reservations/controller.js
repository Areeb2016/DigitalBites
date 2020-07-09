const Food = require("./model");
const Reservation = require("./model");
const Nexmo = require("nexmo");
const Restaurant = require("../Restaurant/model");
var moment = require("moment");

const reportreservations = function (req, res, next) {
	const { product, rid } = req.headers;
	console.log(product);
	if (product === "daily") {
		var currentdate = moment().format();
		var datelimit = moment().subtract(24, "hour").format();
	} else if (product === "weekly") {
		var currentdate = moment().format();
		var datelimit = moment().subtract(7, "days").format();
	} else if (product === "monthly") {
		var currentdate = moment().format();
		var datelimit = moment().subtract(30, "days").format();
	} else {
		var currentdate = moment().format();
		var datelimit = moment().subtract(1, "year").format();
	}

	const aggregatorOpts = [
		{
			$match: {
				createdAt: {
					$gte: new Date(datelimit),
					$lte: new Date(currentdate),
				},
				restaurantId: rid,
			},
		},
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
			},
		},
	];

	Reservation.aggregate(aggregatorOpts)
		.exec()
		.then((status) => res.json(status))
		.catch((err) => next(err));
};

const createReservation = function (req, res, next) {
	var reservation = new Reservation({
		name: req.body.name,
		Mobileno: req.body.mobileno,
		Date: req.body.chosenDate,
		Time: req.body.time,
		Tpeoples: req.body.selected,
		reserveBy: req.user.email,
		rname: req.body.rname,
		rowner:req.body.rowner
	});

	console.log(reservation);

	reservation
		.save()
		.then(function (dbProduct) {
			res.send("Reservation Successfull");
		})
		.catch(function (err) {
			res.json(err);
		});
};

const getAllReservations = function (req, res, next) {
	Reservation.find()
		.exec()
		.then((reservation) => res.json(reservation))
		.catch((e) => next(e));
};
const ReservationHistory = function (req, res, next) {
	Reservation.find({ reserveBy: req.user.email })
		.lean()
		.exec()
		.then((reservation) => res.json(reservation))
		.catch((e) => next(e));
};

const getspecificReservation = function (req, res, next) {
	let id = req.params.id;
	console.log(id);

	Reservation.findById(id)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};

// // Updates Food By id
const confirmstatus = function (req, res, next) {
	let reserveId = req.params.id;

	console.log(req.body);
	const nexmo = new Nexmo({
		apiKey: "bbc69f5d",
		apiSecret: "xub7gDQDduWJnKRV",
	});
	const number = req.body.Mobileno;

	const text =
		"Your Reservation " + " " + req.params.id + "has been confirmed";

	const from = "Nexmo";

	//nexmo.message.sendSms(from, number, text)

	Reservation.findById(reserveId, function (err, data) {
		if (!data) res.status(404).send("data is not found");
		else {
			data.status = req.body.status;

			data.save()
				.then((reservation) => res.json("status updated"))
				.catch((err) => next(err));
		}
	});
};

const cancelstatus = function (req, res, next) {
	let reserveId = req.params.id;

	const nexmo = new Nexmo({
		apiKey: "bbc69f5d",
		apiSecret: "xub7gDQDduWJnKRV",
	});
	const number = req.body.Mobileno;
	console.log(number);
	const text =
		"Your Reservation" + " " + req.params.id + "has been cancelled";
	console.log(text);
	const from = "Nexmo";

	Reservation.findById(reserveId, function (err, data) {
		if (!data) res.status(404).send("data is not found");
		else {
			data.status = req.body.status;

			data.save()
				.then((reservation) => res.json("status updated"))
				.catch((err) => next(err));
		}
	});
};

module.exports = {
	createReservation,
	getAllReservations,
	getspecificReservation,
	confirmstatus,
	cancelstatus,
	reportreservations,
	ReservationHistory,
};
