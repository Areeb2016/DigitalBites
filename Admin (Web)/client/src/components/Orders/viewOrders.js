import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';

import { Spin } from 'shineout'

import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			restaurants: [],
			Reservations: [],
			count: [],
			rname: "none",
			filter: "",
			isloading: true,
		};

		this.url = "https://digitalbites.herokuapp.com/orders/";
		this.restauranturl = "https://digitalbites.herokuapp.com/restaurant/R";
		this.token = localStorage.getItem("token");
	}

	componentDidMount = () => {
		this.getreservations();

		this.getcount();
		this.usespinner();
	}
	getcount = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};

		axios
			.get("https://digitalbites.herokuapp.com/orders/report", {
				headers: headers,
			}) //check the localhost link
			.then((response) => {
				return response;
			})
			.then((res) => {
				console.log(res);
				this.setState({ count: res.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	};



	getreservations = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		axios
			.get(this.url, { headers: headers })

			.then((response) => {
				this.setState({ todos: response.data });

				this.setState({ filter: "all" });
				this.setState({ isloading: false });
			})
			.catch((error) => {
				// this.setState({ toDashboard: true });
				console.log(error);
			});
	};


	usespinner = () => {

		if (this.state.isloading) {
			return (
				<Spin size="54px" name="four-dots" color="#dc3545" />
			);
		}


		else {
			const script = document.createElement("script");
			script.src = "build/content.js";
			script.async = true;
			document.body.appendChild(script);

		}
	};


	todoList() {

		return this.state.todos.map((todos, index) => {
			const { assighnedto, status, createdAt, rname } = todos; //destructuring
			return (
				<tr key={index}>
					<td>{index + 1}</td>

					<td>{status}</td>
					<td>{assighnedto}</td>
					<td> <Moment date={createdAt} /> </td>
					<td>{rname}</td>

					<td>
						<Link
							to={{ pathname: "orderdetails/" + todos._id }}
							style={{ color: "#8E0438" }}
						>
							{" "}
							<i class="fa fa-eye" aria-hidden="true"></i>
						</Link>
					</td>

				</tr>
			);
		});


		//  })
	}
	render() {

		return (
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6"></div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/dashboard">Home</a>
									</li>
									<li className="breadcrumb-item active">
										View Orders
									</li>
								</ol>
							</div>
						</div>
					</div>
					{/* /.container-fluid */}
				</section>
				<section className="content">
					<div className="container-fluid">
						<div id="content-wrapper">
							<div className="row">
								{this.state.count.map((key, index) => (
									<div className="col-xl-3 col-sm-6 mb-6">
										<div className="card text-white   h-100">
											<div
												className="card-body"
												style={{
													backgroundColor: "#8E0438",
												}}
											>
												<div
													className="mr-5"
													style={{
														color: "white",
														fontSize: 16,
													}}
												>
													{key._id}
												</div>
											</div>
											<Link
												className="card-footer text-white clearfix small z-1"
												to={"#"}
											>
												<span
													className="float-left"
													style={{
														color: "black",
														fontSize: 30,
													}}
												>
													{key.count}
												</span>
											</Link>
										</div>
									</div>
								))}
							</div>


							<div className="card" style={{marginTop:"40px"}}>
								<div className="card-header">
									<h3 className="card-title">
										Orders
												</h3>
								</div>
								<div className="card-body">
									<table
										id="example1"
										className="table table-bordered table-striped"

									>
										<thead>
											<tr>
												<th> SR.No</th>

												<th>Status</th>
												<th>Assigned</th>
												<th>Date</th>
												<th>Restaurant</th>
												{/* <th>Order ID</th> */}
												<th>View</th>

											</tr>
										</thead>
										<tbody>{this.todoList()}</tbody>
									</table>
								</div>

							</div>
						</div>
					</div>
					{this.usespinner()}

				</section>
			</div>
		);
	}
}
