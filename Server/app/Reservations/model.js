const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
	status: {
		type: String,
		default: "pending",
	},
	name: {
		type: String,

		required: true,
	},
	Mobileno: {
		type: Number,
		min: 11,
	},

	Date: {
		type: Date,
	},
	Time: {
		type: String,
	},
	Tpeoples: {
		type: Number,
	},
	createdAt: { type: Date, default: Date.now },

	reserveBy: {
		type: String,
	},
	rname:{
		type:String
	  },
	 rowner:{
		  type:String
	  }
});

module.exports = mongoose.model("Reserve", reserveSchema);
