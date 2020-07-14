import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Spin } from 'shineout'
import { Message } from 'shineout'

export default class restaurantDetails extends Component {
	constructor(props) {
		super(props);
		this.url = "https://digitalbites.herokuapp.com/restaurant/";
		this.token = localStorage.getItem("token");

		this.state = {
			id: "",
			redirect: false,
			isloading: true,

			Adress: "",
			Description: "",
			image: "",
			createdby: "",
			createdat: "",
			status: "",
		};
	}
	usespinner = () => {

		if (this.state.isloading) {
			return (
				<Spin size="54px" name="four-dots" color="#dc3545" />
			);
		}
	}

	componentDidMount() {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		const id = this.props.match.params.id;
		console.log(id);
		axios
			.get(this.url + id, { headers: headers })
			.then((response) => {
				const emp = response.data;
				console.log(response);
				this.setState({ isloading: false });

				this.setState({ Adress: emp.address });
				this.setState({ image: emp.image });

				this.setState({ createdby: emp.createdBy });
				this.setState({ Description: emp.description });
				this.setState({ createdat: emp.createdAt });
				this.setState({ status: emp.status });
			})
			.catch((error) => {
				// this.setState({ toDashboard: true });
				console.log(error);
			});
	}
	handleBlock = (event) => {

		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		const url =
			"https://digitalbites.herokuapp.com/restaurant/status/" + event.target.id;

		axios
			.patch(url, { status: "Blocked" }, { headers: headers })
			.then((result) => {
				Message.success("Restaurant Blocked  sucessful ", 6, {
					position: 'top-right',
					title: 'Successful',
				})

				this.componentDidMount();
			})
			.catch((error) => {
				Message.error("Status not updated", 6, {
					position: 'top-right',
					title: 'Unsuccessful',
				})
			});
	};
	handleactivate = (event) => {

		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		const url =
			"https://digitalbites.herokuapp.com/restaurant/status/" +
			event.target.id;

		axios
			.patch(url, { status: "confirmed" }, { headers: headers })
			.then((result) => {
				Message.success("Restaurantstatus confirmed sucessful ", 6, {
					position: 'top-right',
					title: 'Successful',
				})
				this.componentDidMount();
			})
			.catch((error) => {
				Message.error("Status not updated", 6, {
					position: 'top-right',
					title: 'Unsuccessful',
				})
			});
	};

	render() {
		const {
			Adress,
			Description,
			createdby,
			createdat,
			image,
			status,
		} = this.state;

		console.log(createdat);
		const isLoading = this.state.isLoading;
		if (this.state.toDashboard === true) {
			return <Redirect to="/" />;
		}
		return (
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1>Restaurant Details</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/dashboard">Home</a>
									</li>
									<li className="breadcrumb-item">
										<a href="/viewRestaurants">
											View Restaurants
										</a>
									</li>
									<li className="breadcrumb-item active">
										Restaurant Details
									</li>
								</ol>
							</div>
						</div>
					</div>
					{/* /.container-fluid */}
				</section>
				<section className="content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-6">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">
											<i className="fas fa-utensils" />
											Restaurant Details
										</h3>
									</div>
									{/* /.card-header */}
									<div className="card-body">
										<dl>
											<dt>Description</dt>
											<dd>{Description}</dd>
											<dt>Created At</dt>
											<dd>{createdat}</dd>
											<dt>Address</dt>
											<dd>{Adress}</dd>

											<dt>Status</dt>
											<dd>{status}</dd>
											<dt>Image</dt>
											<dd>
												<div class="filter-container p-0 row">
													<div
														class="filtr-item col-sm-2"
														data-category="1"
														data-sort="white sample"
													>
														<img
															src={image}
															class="img-fluid mb-2"
															alt="white sample"
														/>
													</div>
												</div>
											</dd>
										</dl>
									</div>
									{/* /.card-body */}
								</div>
								{/* /.card */}
							</div>
							{/* ./col */}
							<div className="col-md-6">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">
											<i className="fas fa-cog" />
											Actions
										</h3>
									</div>
									{/* /.card-header */}
									<div className="card-body">
										<dl>
											<dt></dt>
											<dd>
												{" "}
												<button
													type="button"
													id={
														this.props.match.params
															.id
													}
													class="btn btn-block btn-primary btn-lg"
													onClick={
														this.handleactivate
													}
												>
													Activate Restaurant
												</button>
											</dd>
											<dt></dt>
											<dd>
												{" "}
												<button
													type="button"
													id={
														this.props.match.params
															.id
													}
													class="btn btn-block btn-danger btn-lg"
													onClick={this.handleBlock}
												>
													Block Restaurant
												</button>
											</dd>
										</dl>
									</div>
									{/* /.card-body */}
								</div>
								{/* /.card */}
							</div>
							{this.usespinner()}
							{/* ./col */}
						</div>
					</div>
				</section>
			</div>
		);
	}
}
