const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
	createdBy: {
		type: String,
	},
	items: {
		type: Array,
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
	assighnedto: {
		type: String,
		default: "None",
	},
	createdAt: { type: Date, default: Date.now },
	rname:{
		type: String,
	},
	rowner:{
		 type:String
	}
});

module.exports = mongoose.model("Orders", Orders);
