const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtkey } = require("../config/keys");
const router = express.Router();
var Review = require("../models/Review");
const User = mongoose.model("User");
const Food = require("../app/Food/model");

const requireToken = require("../middleware/requireToken");
var foodreview = require("../models/foodreview");

var Messages = require("../models/Message");

router.post("/signup", async (req, res) => {
	console.log(req.body);

	const { email, password, address, phone, name, role } = req.body;

	try {
		const user = new User({ email, password, address, phone, name, role });
		await user.save();
		const token = jwt.sign({ userid: user._id }, jwtkey);
		res.send({ token });
		console.log(token);
	} catch (err) {
		console.log(err);
		return res.status(422).send(err.message);
	}
});

router.get("/viewratings", (req, res) => {
	Review.find({})

		.exec()
		.then((rating) => res.json(rating));
});

router.post("/foodratings/:id", requireToken, async (req, res) => {
	var foodratings = new foodreview({
		rating: req.body.rating,
		reviewby: req.user.email,
		reviews: req.body.reviews,
	});

	foodratings
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
			res.json(dbProduct);
		})
		.catch(function (err) {
			res.json(err);
		});
});

router.get("/viewfoodratings", (req, res) => {
	foodreview
		.find({})

		.exec()
		.then((rating) => res.json(rating));
});

router.get("/viewreport", requireToken, (req, res) => {
	const aggregatorOpts = [
		{
			$group: {
				_id: "$name",
				count: { $avg: "$rating" },
			},
		},
	];
	foodreview
		.aggregate(aggregatorOpts)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
});

router.post("/message", requireToken, async (req, res) => {
	try {
		const message = new Messages({
			name: req.body.name,
			email: req.body.email,
			Message: req.body.message,
		});

		message.save();
	} catch (err) {
		console.log(err);
		return res.status(422).send(err.message);
	}
});

router.post("/signin", async (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(422)
			.send({ error: "must provide email or password" });
	}
	const user = await User.findOne({ email });
	if (!user) {
		return res
			.status(422)
			.send({ error: "must provide email or password" });
	}
	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user._id }, jwtkey);
		res.send({ token });
	} catch (err) {
		return res
			.status(422)
			.send({ error: "must provide email or password" });
	}
});

module.exports = router;
