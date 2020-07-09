const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const { mogoUrl } = require("./config/keys");
const socketio = require("socket.io");
require("./models/User");
const images = require("./models/images");
const requireToken = require("./middleware/requireToken");
const authRoutes = require("./routes/authRoutes");
const Restaurant = require("./app/Restaurant");
const cuisines = require("./app/Food");
const Reservation = require("./app/Reservations");
const Orders = require("./app/Orders");
const Riders = require("./app/Riders");

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use("/restaurant", Restaurant);
app.use("/food", cuisines);
app.use("/reservation", Reservation);

app.use("/orders", Orders);
app.use("/rider", Riders);
mongoose.connect(mogoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
	console.log("connected to mongo yeahh");
});

mongoose.connection.on("error", (err) => {
	console.log("this is error", err);
});

app.get('/',requireToken,(req,res)=>{
    console.log(req.user)
    
    res.send({name:req.user.name,role:req.user.role,email:req.user.email,password:req.user.password,address:req.user.address,phone:req.user.phone})
})

const server = app.listen(PORT, () => {
	console.log("server running " + PORT);
});

const io = socketio(server);
io.on("connection", (socket) => {
	console.log("client connected on websocket");
});
