import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Spin } from 'shineout'
import { Message } from 'shineout'
export default class orderDetails extends Component {
	constructor(props) {
		super(props);
		this.url = "https://digitalbites.herokuapp.com/rider/";
		this.ordersurl = "https://digitalbites.herokuapp.com/orders/";
		this.token = localStorage.getItem("token");

		this.state = {
			id: "",
			redirect: false,
			isloading: true,
			orders: [],
			value1: " ",

			value: "",
			riders: [],
		};

		this.handleChange = this.handleChange.bind(this);
		this.riderChange = this.riderChange.bind(this);
	}
	handleChange(event) {
		this.setState({ value1: event.target.value });

		const token = localStorage.getItem("token");
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		};
		const url =
			"https://digitalbites.herokuapp.com/orders/updatestatus/" +
			this.props.match.params.id;

		axios
			.patch(url, { status: event.target.value }, { headers: headers })
			.then((result) => {
			
			Message.success("Order Status changed successfully", 6, {
				position: 'top-right',
				title: 'Successful',
			})
			})
			.catch((error) => {
				Message.error("Order Status not updated", 6, {
					position: 'top-right',
					title: 'Unsuccessful',
				})
			});
	}
	riderChange(event) {
		this.setState({ value: event.target.value });
		const token = localStorage.getItem("token");
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		};
		const url =
			"https://digitalbites.herokuapp.com/orders/updaterider/" +
			this.props.match.params.id;

		axios
			.patch(
				url,
				{ assighnedto: event.target.value },
				{ headers: headers }
			)
			.then((result) => {
				Message.success("Order assighned successfully", 6, {
					position: 'top-right',
					title: 'Successful',
				})
			})
			.catch((error) => {
				Message.error("Order as not asssighned", 6, {
					position: 'top-right',
					title: 'Unsuccessful',
				})
			});
	}
	usespinner = () => {

		if (this.state.isloading) {
			return (
				<Spin size="54px" name="four-dots" color="#dc3545" />
			);
		}
	}
	componentDidMount() {
		this.getriders();
		this.getorders();
	}
	getriders = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};

		axios
			.get(this.url, { headers: headers })
			.then((response) => {
				const rider = response.data;

				this.setState({ riders: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	getorders = async () => {
		const id = this.props.match.params.id;
		const response = await fetch(this.ordersurl + id, {
			headers: new Headers({
				Authorization: "Bearer " + this.token,
			}),
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson.items);

				this.setState({ orders: responseJson.items });
				this.setState({ isloading: false });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	todoList() {
		return this.state.orders.map((todos, index) => {
			const { name, price, image, type } = todos.food;

			return (
				<tr key={index}>
					<td>{name}</td>
					<td>{todos.quantity}</td>

					<td>{price}</td>
					<td>{type}</td>
				</tr>
			);
		});
	}
	render() {
		const { name, riders } = this.state;

		let Rider = riders.map((v) => <option value={v.name}>{v.name}</option>);
		const isLoading = this.state.isLoading;

		return (
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1>Order Details</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/dashboard">Home</a>
									</li>
									<li className="breadcrumb-item">
										<a href="/viewOrders">View Orders</a>
									</li>
									<li className="breadcrumb-item active">
										Order Details
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
											<i className="fas fa-hamburger" />
											Order Details
										</h3>
									</div>
									{/* /.card-header */}
									<div className="card-body">
										<table
											id="todos"
											className="table table-striped"
										>
											<thead>
												<tr>
													<th> product name</th>

													<th>Quantity</th>
													<th>Price</th>

													<th>Type</th>
												</tr>
											</thead>
											<tbody>{this.todoList()}</tbody>
										</table>
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
											<dt>Select Order Status</dt>
											<dd>
												{" "}
												<div class="form-group">
													<select
														className="form-control"
														value={
															this.state.value1
														}
														onChange={
															this.handleChange
														}
													>
														<option>
															Select Status
														</option>

														<option value="confirm">
															{" "}
															Confirm Order
														</option>
														<option value="cancel">
															{" "}
															Cancel Order
														</option>
														<option value="assighned">
															Assighn for Delivery
														</option>
													</select>
												</div>
											</dd>
											<dt>Select Rider</dt>
											<dd>
												<div class="form-group">
													<select
														className="form-control"
														value={this.state.value}
														onChange={
															this.riderChange
														}
													>
														<option>
															Select Rider
														</option>
														{Rider}
													</select>
												</div>
											</dd>
										</dl>
									</div>
									{/* /.card-body */}
								</div>
								{/* /.card */}
							</div>
							{/* ./col */}
						</div>
					</div>
					{this.usespinner()}
				</section>
			</div>
		);
	}
}
