import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./viewr.css";
import axios from "axios";
import { Message } from 'shineout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Spin } from 'shineout'
import Moment from 'react-moment';
export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			restaurants: [],
			Menu: [],
			rname: "none",
			filter: "",
			isloading: true,
		};

		this.riderurl = "https://digitalbites.herokuapp.com/rider/";
		this.restauranturl = "https://digitalbites.herokuapp.com/restaurant/R";
		this.token = localStorage.getItem("token");
	}

	componentDidMount() {
		this.getriders();
		this.getrestaurant();
	}




	getriders = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		axios
			.get(this.riderurl, { headers: headers })
			.then((response) => {
				this.setState({ todos: response.data });

				this.setState({ isloading: false });
			})
			.catch((error) => {
				// this.setState({ toDashboard: true });
				console.log(error);
			});
	};
	getrestaurant = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};

		axios
			.get(this.restauranturl, { headers: headers })
			.then((response) => {
				console.log(response);

				this.setState({ restaurants: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleClickDelete = (event) => {


		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,

		};

		axios
			.delete(
				"https://digitalbites.herokuapp.com/rider/delete/" + event.target.value,
				{ headers: headers }
			)
			.then((response) => {

				Message.success("Rider successfully deleted", 6, {
					position: 'top-right',
					title: 'Successful',
				})
			})
			.catch((error) => {
				Message.error("Rider cannot be  deleted", 6, {
					position: 'top-right',
					title: 'Unsuccessful',
				})

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
			const { name, email, Phonenumber, createdAt, _id, rname } = todos; //destructuring

			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{name}</td>
					<td>{email}</td>
					<td>{Phonenumber}</td>

					<td> <Moment date={createdAt} /></td>
					<td> {rname} </td>

					<td>
						<Link

							to={"/editrider/" + todos._id}
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
										View Riders
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


							<div className="card">
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
												<th>Email</th>
												<th>Phone</th>

												<th>Created At</th>
												<th>Restaurant</th>

												<th>Edit</th>
												<th>Delete</th>
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
