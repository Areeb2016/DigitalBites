const Food = require("./model");
var multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const Restaurant = require("../Restaurant/model");
const Category = require("./categorymodel");
const Review = require("../../models/foodreview");

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
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
var upload = multer({
	storage: storage,
}).single("file");

const viewcategory = function (req, res, next) {
	console.log("kia ha bhi");
	Category.find()
		.exec()
		.then((category) => res.json(category))
		.catch((err) => next(err));
};

const foodRating = function (req, res) {
	var review = new Review({
		rating: req.body.rating,
		reviewby: req.user.email,
		reviews: req.body.reviews,
	});
	console.log(review);
	review
		.save()
		.then(function (dbReview) {
			return Food.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$push: {
						foodReviews: {
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

// Creates a food
const createFood = function (req, res, next) {
	upload(req, res, function (err) {
		const image = req.file.url;

		// const image = []

		// for (const file of files) {
		//   const { url } = file;
		//   image.push(url)
		// }

		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}

		const food = new Food({
			name: req.body.name,

			price: req.body.price,
			description: req.body.description,
			image: image,
			category: req.body.category,
			Duration: req.body.duration,
			Serving: req.body.serving,
			createdBy: req.user.email,
		});

		food.save()

			.then(function (dbReview) {
				return Restaurant.findOneAndUpdate(
					{ name: req.body.restaurantname },
					{
						$push: {
							Menu: {
								food: dbReview._id,
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
	});

	// // TODO: This should trigger restaurant's type
};

const countreport = function (req, res, next) {
	const aggregatorOpts = [
		{
			$group: {
				_id: null,
				count: { $sum: 1 },
			},
		},
	];
	Food.aggregate(aggregatorOpts)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};

const addcategory = function (req, res, next) {
	const category = new Category({
		name: req.body.name,
		description: req.body.description,
		createdBy: req.user.email
	});

	category
		.save()
		.then(function (dbReview) {
			res.json(dbReview);
		})
		.catch(function (err) {
			res.json(err);
		});

	// // TODO: This should trigger restaurant's type
};

const getAllFood = function (req, res, next) {
	Food.find({ createdBy: req.user.email })
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};
const reportfood = function (req, res, next) {
	console.log(req.user.email);
	const aggregatorOpts = [
		{
			$match: {
				createdBy: req.user.email,
			},
		},
		{
			$group: {
				_id: "$category",
				count: { $sum: 1 },
			},
		},
	];
	Food.aggregate(aggregatorOpts)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};
const getspecificFood = function (req, res, next) {
	let id = req.params.id;

	Food.findById(id)
		.populate("foodReviews.review")
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
};

// Deletes Food By id
const deleteFoodById = function (req, res, next) {
	let foodId = req.params.id;
	const { rname } = req.headers;
	console.log(rname)


	Food
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(function (dbReview) {
			return Restaurant.findOneAndUpdate({ _id: rname },
				{
					$pull: {
						Menu: {
							food: dbReview._id,
						}
					}
				},

				{ new: true });
		})
		.then(function (dbProduct) {

			res.json("Deleted");
		})
		.catch(function (err) {

			res.json(err);
		});
};

// Updates Food By id
const updateFoodById = function (req, res, next) {
	let foodId = req.params.id;
	console.log(req.params.id);

	Food.findById(foodId, function (err, data) {
		if (!data) res.status(404).send("data is not found");
		else {
			data.name = req.body.name;

			data.Serving = req.body.serving;
			data.price = req.body.price;
			data.description = req.body.description;
			data.category = req.body.category;
			data.Duration = req.body.duration;

			data.save()
				.then((food) => res.json("Food updated"))
				.catch((err) => next(err));
		}
	});
};

const getFoodType = function (req, res, next) {
	Food.find()
		.distinct("type")
		.exec()
		.then((types) => res.json(types))
		.catch((err) => next(err));
};

module.exports = {
	createFood,
	getAllFood,
	deleteFoodById,
	updateFoodById,
	getFoodType,
	getspecificFood,
	reportfood,
	addcategory,
	viewcategory,
	countreport,
	foodRating,
};
