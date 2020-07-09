const mongoose = require("mongoose");

const Food = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},

	price: {
		type: Number,
		require: true,
	},
	description: {
		type: String,
	},
	category: {
		type: String,
	},
	image: {
		type: String,
	},
	Duration: {
		type: String,
	},
	Serving: {
		type: String,
	},
	createdBy: {
		type: String,
	},
	createdAt: { type: Date, default: Date.now },
	foodReviews: [
		{
			review: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "foodreview",
			},
		},
	],
});

module.exports = mongoose.model("Food", Food);
