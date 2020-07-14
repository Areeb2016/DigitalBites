import React, { Component } from "react";

export default class Menu extends Component {
	render() {
		return (
			<div>
				<aside className="main-sidebar sidebar-dark-primary elevation-4">
					{/* Brand Logo */}
					<a href="index3.html" className="brand-link">
						<img
							src="applogo8.png"
							alt="AdminLTE Logo"
							className="brand-image img-circle elevation-3"
							style={{ opacity: ".8" }}
						/>
						<span className="brand-text font-weight-light">
							Digital Bites
						</span>
					</a>
					{/* Sidebar */}
					<div className="sidebar">
						{/* Sidebar user panel (optional) */}
						<div className="user-panel mt-3 pb-3 mb-3 d-flex">
							<div className="image">
								<img
									src="dist/img/user2-160x160.jpg"
									className="img-circle elevation-2"
									alt="User"
								/>
							</div>
							<div className="info">
								<a href="" className="d-block">
									Admin
								</a>
							</div>
						</div>
						{/* Sidebar Menu */}
						<nav className="mt-2">
							<ul
								className="nav nav-pills nav-sidebar flex-column"
								data-widget="treeview"
								role="menu"
								data-accordion="false"
							>
								{/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
								<li className="nav-item has-treeview menu-open">
									<a href="/dashboard" className="nav-link">
										<i className="nav-icon fas fa-tachometer-alt" />
										<p>Dashboard</p>
									</a>
								</li>
								<li className="nav-item has-treeview">
									<a href="dummy_url" className="nav-link">
										<i className="nav-icon fas fa-hamburger" />
										<p>
											Orders
											<i className="fas fa-angle-left right" />
											{/* <span className="badge badge-info right">6</span> */}
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<a
												href="/viewOrders"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>View Order Details</p>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-item has-treeview">
									<a href="dummy_url" className="nav-link">
										<i className="nav-icon fas fa-chart-pie" />
										<p>
											Reports
											<i className="right fas fa-angle-left" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<a
												href="/orderreport"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>Orders Report</p>
											</a>
										</li>
										<li className="nav-item">
											<a
												href="/reservationreport"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>Reservations Report</p>
											</a>
										</li>
										<li className="nav-item">
											<a
												href="/cuisinereport"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>Cuisine Reports</p>
											</a>
										</li>
										<li className="nav-item">
											<a
												href="/restaurantreport"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>Restaurants Report</p>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-item has-treeview">
									<a href="dummy_url" className="nav-link">
										<i className="nav-icon fas fa-clipboard-check" />
										<p>
											Reservations
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<a
												href="/viewReservations"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>View Reservations</p>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-item has-treeview">
									<a href="dummy_url" className="nav-link">
										<i className="nav-icon fas fa-utensils" />
										<p>
											Restaurants
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<a
												href="/restaurant"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>Add Restaurant</p>
											</a>
										</li>

										<li className="nav-item">
											<a
												href="/viewRestaurants"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>View Restaurants</p>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-item has-treeview">
									<a href="dummy_url" className="nav-link">
										<i className="nav-icon fas fa-book-open" />
										<p>
											Menu
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">

										<li className="nav-item">
											<a
												href="/category"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>Add Category</p>
											</a>
										</li>
										<li className="nav-item">
											<a
												href="/addproduct"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>Add Menu</p>
											</a>
										</li>

										<li className="nav-item">
											<a
												href="/viewMenus"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>View Menus</p>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-item has-treeview">
									<a href="dummy_url" className="nav-link">
										<i className="nav-icon fas fa-bicycle" />
										<p>
											Rider
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<a
												href="/rider"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>Add Rider</p>
											</a>
										</li>
										<li className="nav-item">
											<a
												href="/viewRiders"
												className="nav-link"
											>
												<i className="far fa-circle nav-icon" />
												<p>View Riders</p>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</nav>
						{/* /.sidebar-menu */}
					</div>
					{/* /.sidebar */}
				</aside>
			</div>
		);
	}
}
