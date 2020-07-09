const mongoose = require("mongoose");

const Restaurant = new mongoose.Schema({
	name: {
		type: String,
	},
	createdBy: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: String,
		required: true,
	},

	estimatedDeliveryTime: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	image: {
		type: String,
	},
	vrimage: {
		type: String,
	},
	latitude: {
		type: String,
	},
	longitude: {
		type: String,
	},
	status: {
		type: String,
		default: "pending",
	},
	createdAt: { type: Date, default: Date.now },

	Reviews: [
		{
			review: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Review",
			},
		},
	],

	Menu: [
		{
			food: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Food",
			},
		},
	],
	Riders: [
		{
			rider: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Rider",
			},
		},
	],

});

module.exports = mongoose.model("Restaurant", Restaurant);
