import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./viewr.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Spin } from 'shineout'
import { Message } from 'shineout'
export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = { todos: [], count: [], checked: false, isloading: true };
		this.url = "https://digitalbites.herokuapp.com/restaurant/R";
		this.token = localStorage.getItem("token");
	}

	componentDidMount() {
		this.getallrestauranr();
		this.getcount();
	}

	getallrestauranr = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		axios
			.get(this.url, { headers: headers })

			.then((response) => {
				console.log(response);
				this.setState({ todos: response.data });
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


	getcount = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};

		axios
			.get("https://digitalbites.herokuapp.com/restaurant/countreport", {
				headers: headers,
			}) //check the localhost link
			.then((response) => {
				return response;
			})
			.then((res) => {
				console.log(res.data);
				this.setState({ count: res.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	handleClickDelete = (event) => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		console.log(event.target.value);
		axios
			.delete(
				"https://digitalbites.herokuapp.com/restaurant/delete/" +
				event.target.value,
				{ headers: headers }
			)
			.then((response) => {
				Message.success("Restaurants deleted", 5, {
					position: 'top-right',
					title: 'Successful',
				})
			})
			.catch((error) => {
				Message.error("Restaurant cannot be deleted", 5, {
					position: 'top-right',
					title: 'Unsuccessful',
				})
			});
	};

	todoList() {
		return this.state.todos.map((todos, index) => {
			const {
				name,
				email,
				contactNumber,
				cuisine,
				estimatedDeliveryTime,
				description,
				address,
				image,
				foods,
				status
			} = todos; //destructuring
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{name}</td>

					<td>{contactNumber}</td>

					<td>{estimatedDeliveryTime}</td>
					<td>{description}</td>
					<td>{status}</td>

					<td>
						<Link
							to={"/Rdetails/" + todos._id}
							style={{ color: "#8E0438" }}
						>
							<i class="fa fa-eye" aria-hidden="true"></i>
						</Link>
					</td>

					<td>
						<Link
							to={"/editr/" + todos._id}
							style={{ color: "#8E0438" }}
						>
							<FontAwesomeIcon icon={faPencilAlt} />
						</Link>
					</td>
					<td>
						<button
							value={todos._id}
							className="btn btn-sm btn-danger"

							onClick={this.handleClickDelete}
						>
							{" "}
							Delete{" "}
						</button>
					</td>
				</tr>
			);
		});
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
										View Restaurants
									</li>
								</ol>
							</div>
						</div>
					</div>
					{/* /.container-fluid */}
				</section>
				<section className="content">
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
									Restaurants
												</h3>
							</div>
							<div className="card-body">
								<table
									id="example1"
									className="table table-bordered table-striped"
								>
									<thead>
										<tr>
											<th>SR.No</th>
											<th>Name</th>

											<th>Contact Number</th>

											<th>Delivery Time</th>
											<th>Description</th>

											<th>Status</th>
											<th>View</th>
											<th>Edit</th>
											<th>Delete</th>
										</tr>
									</thead>
									<tbody>{this.todoList()}</tbody>
								</table>
							</div>
						</div>
					</div>
					{this.usespinner()}
				</section>
			</div>
		);
	}
}
