import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./content";
//Restaurant
import Restaurant from "./Restaurant/restaurant.js";
import viewRestaurants from "./Restaurant/viewRestaurants.js";
import RestaurantReport from "./Restaurant/Restaurantreport.js";
import EditRestaurant from "./Restaurant/editrestaurant.js";
import RestaurantDetails from "./Restaurant/Restaurantdetails.js";


//Orders
import Order from "./Orders/order.js";
import ViewOrders from "./Orders/viewOrders.js";
import OrderDetails from "./Orders/orderdetails.js";
import OrderReports from "./Orders/orderreport.js";

//Product
import CuisineReports from "./Product/cuisinereport.js";
import addproduct from "./Product/addproduct.js";
import EditFood from "./Product/editfood.js";
import viewMenus from "./Product/viewMenus.js";
import addcategory from "./Product/Category.js";

//Rider
import viewRiders from "./Riders/viewRiders.js";
import editrider from "./Riders/editrider.js";
import Rider from "./Riders/rider.js";

//Reservation
import ViewReservations from "./Reservations/viewReservations.js";
import ReservationDetails from "./Reservations/Reservationdetails.js";
import ReservationReport from "./Reservations/ReservationReport.js";


import ProductDetailsscreen from "./productdetailspage";
import Landing from "./landing";
import Login from "./login";
import Reg from "./reg";
import RestaurantLocation from "./Home";
import Select from "./select";
import Faqs from './faq';
import services from './services'

const Routes = () => (
	// <Switch>

	// 	<Route path="/select" component={Select}/>
	// </Switch>
	<main>
		<Switch>
			<Route path="/" component={Landing} exact />
			<Route path="/services" component={services} />
			<Route path="/restaurantlocation" component={RestaurantLocation} />;
			<Route path="/order" component={Order} />
			<Route path="/Rdetails/:id" component={RestaurantDetails} />
			<Route path="/restaurant" component={Restaurant} />
			<Route path="/addproduct" component={addproduct} />
			<Route path="/rider" component={Rider} />
			<Route path="/viewOrders" component={ViewOrders} />
			<Route path="/viewReservations" component={ViewReservations} />
			<Route path="/viewMenus" component={viewMenus} />
			<Route path="/viewRestaurants" component={viewRestaurants} />
			<Route path="/viewRiders" component={viewRiders} />
			<Route path="/viewRiders" component={viewRiders} />
			<Route path="/editfood/:id" component={EditFood} />
			<Route path="/details/:id" component={ReservationDetails} />
			<Route path="/editr/:id" component={EditRestaurant} />
			<Route path="/editrider/:id" component={editrider} />
			<Route path="/orderdetails/:id" component={OrderDetails} />
			<Route path="/orderreport" component={OrderReports} />
			<Route path="/reservationreport" component={ReservationReport} />
			<Route path="/restaurantreport" component={RestaurantReport} />
			<Route path="/cuisinereport" component={CuisineReports} />
			<Route path="/prodDetails/:id" component={ProductDetailsscreen} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/login" component={Login} />
			<Route path="/reg" component={Reg} />
			<Route path="/category" component={addcategory} />
			<Route path="/faqs" component={Faqs} />
		</Switch>
	</main>
);
export default Routes;
