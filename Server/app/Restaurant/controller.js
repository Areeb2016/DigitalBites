const Restaurant = require("./model");
var multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
var Review = require("../../models/Review");

var moment = require("moment");
// *********************************************************************
const createRating = function (req, res) {
	var review = new Review({
		rating: req.body.rating,
		reviewby: req.user.email,
		reviews: req.body.reviews,
	});
	review
		.save()
		.then(function (dbReview) {
			return Restaurant.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$push: {
						Reviews: {
							review: dbReview._id,
						},
					},
				},

				{ new: true }
			);
		})
		.then(function (dbProduct) {
			console.log(dbProduct);
			res.json(dbProduct);
		})
		.catch(function (err) {
			res.json(err);
		});
};
// *********************************************************************
const getAllRestaurants = function (req, res, next) {
	if (req.user.role === "admin") {
		Restaurant.find({ createdBy: req.user.email })
			.populate("Reviews.review")
			.populate("Menu.food")
			.populate("Riders.rider")
			.exec()
			.then(function (restaurants) {
				res.json(restaurants);
			})
			.catch((e) => next(e));
	} else {
		Restaurant.find({ status: "confirmed" })
			.populate("Reviews.review")
			.populate("Menu.food")
			.populate("Riders.rider")
			.exec()
			.then(function (restaurants) {
				res.json(restaurants);
			})
			.catch((e) => next(e));
	}
};
// *********************************************************************
const superadmin = function (req, res, next) {
	Restaurant.find()
		.exec()
		.then((restaurants) => res.json(restaurants))
		.catch((e) => next(e));
};
// *********************************************************************
const Lreport = function (req, res, next) {
	const aggregatorOpts = [
		{
			$match: {
				createdBy: req.user.email,
			},
		},
		{
			$group: {
				_id: "$address",
				count: { $sum: 1 },
			},
		},
	];
	Restaurant.aggregate(aggregatorOpts)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};

// *********************************************************************

const countreport = function (req, res, next) {
	const aggregatorOpts = [
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
			},
		},
	];
	Restaurant.aggregate(aggregatorOpts)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};
//************************************************************************* */
const getSpecificRestaurant = function (req, res, next) {
	Restaurant.findOne({ _id: req.params.id })
		.populate("Reviews.review")
		.populate("Menu.food")
		.populate("Riders.rider")
		.lean()
		.then(function (restaurant) {
			console.log(JSON.stringify(restaurant, null, "\t"));
			res.json(restaurant);
		})
		.catch(function (err) {
			res.json(err);
		});
};

cloudinary.config({
	cloud_name: "djtxtbeyk",
	api_key: "513434481342956",
	api_secret: "2fOpAtEj9FBJ162mnaDHYxg0TmM",
});
var storage = cloudinaryStorage({
	cloudinary: cloudinary,

	allowedFormats: ["jpg", "png"],
	destination: function (req, file, cb) {
		cb(null, "folder");
	},
	filename: function (req, files, cb) {
		cb(null, files.originalname);
	},
});
var upload = multer({
	storage: storage,
}).array("file", 10);

// *********************************************************************
const createRestaurant = function (req, res, next) {
	upload(req, res, function (err) {
		var image = req.files[0].url;

		var vrimage = req.files[1].url;
		console.log(image);
		console.log(vrimage);

		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}

		const restaurant = new Restaurant({
			name: req.body.name,
			contactNumber: req.body.contactNumber,

			description: req.body.description,
			email: req.body.email,
			estimatedDeliveryTime: req.body.estimatedDeliveryTime,
			image: image,
			createdBy: req.user.email,
			address: req.body.address,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			vrimage: req.body.vrimage,
		});
		restaurant
			.save()
			.then((restaurant) => res.json(restaurant))
			.catch((err) => next(err));
	});
};
// *********************************************************************
const deleteRestaurant = function (req, res, next) {
	let resid = req.params.id;
	Restaurant.findByIdAndDelete(resid)
		.then(() => res.json({ success: true }))
		.catch((e) => next(e));
};
// *********************************************************************
const updateRestaurantById = function (req, res, next) {
	Restaurant.findById(req.params.id, function (err, data) {
		if (!data) res.status(404).send("data is not found");
		else {
			(data.name = req.body.name),
				(data.contactNumber = req.body.contactNumber),
				(data.description = req.body.description),
				(data.email = req.body.email);
			(data.estimatedDeliveryTime = req.body.estimatedDeliveryTime),
				(data.address = req.body.address);
			data.save()
				.then((restaurant) => res.json("Food updated"))
				.catch((err) => next(err));
		}
	});
};

const changestatus = function (req, res, next) {
	Restaurant.findById(req.params.id, function (err, data) {
		if (!data) res.status(404).send("data is not found");
		else if (req.body.status === "Blocked") {
			data.status = req.body.status;
			data.save()
				.then((restaurant) => res.json("Food updated"))
				.catch((err) => next(err));
		} else {
			data.status = req.body.status;
			data.save()
				.then((restaurant) => res.json("Food updated"))
				.catch((err) => next(err));
		}
	});
};
// *********************************************************************
const updateRestaurantstatus = function (req, res, next) {
	let foodId = req.params.id;
	console.log(req.body.status);
	Restaurant.findById(foodId, function (err, data) {
		if (!data) res.status(404).send("data is not found");
		else {
			(data.status = req.body.status),
				data
					.save()
					.then((restaurant) => res.json("Food updated"))
					.catch((err) => next(err));
		}
	});
};
// *********************************************************************
const addFoodToRestaurant = function (req, res, next) {
	const { restaurantId, foodId } = req.body;

	Restaurant.findByIdAndUpdate(restaurantId, {
		food: foodId,
	})
		.exec()
		.then((restaurant) => res.json(restaurant))
		.catch((e) => next(e));
};

const statusreport = function (req, res, next) {
	console.log("i am called ")
	const aggregatorOpts = [


		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
			},
		},
	];
	Restaurant.aggregate(aggregatorOpts)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};
module.exports = {
	createRestaurant,
	getAllRestaurants,
	deleteRestaurant,
	addFoodToRestaurant,
	getSpecificRestaurant,
	updateRestaurantById,
	Lreport,
	superadmin,
	updateRestaurantstatus,
	createRating,
	countreport,
	changestatus,
	statusreport
};
