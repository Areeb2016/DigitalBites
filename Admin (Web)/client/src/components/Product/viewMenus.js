import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Spin } from 'shineout'
export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			restaurants: [],
			Menu: [],
			rname: "none",
			filter: "",
			count: [],
			isloading: true,
		};
		this.restaurantChange = this.restaurantChange.bind(this);
		this.foodurl = "https://digitalbites.herokuapp.com/food/";
		this.restauranturl = "https://digitalbites.herokuapp.com/restaurant/R";
		this.token = localStorage.getItem("token");
	}

	componentDidMount() {
		this.getfood();
		this.getrestaurant();
		this.getcount();
	}

	restaurantChange(event) {
		if (event.target.value === "all") {
			const { filter } = this.state;
			this.setState({ filter: "all" });
			this.setState({ rname: "All" });
		} else {
			this.setState({ rname: event.target.value });
			localStorage.setItem("id", event.target.value);
			this.getData();
		}
	}

	getData = async () => {
		const myname = await localStorage.getItem("id");
		const response = await fetch(
			"https://digitalbites.herokuapp.com/restaurant/" + myname,
			{
				headers: new Headers({
					Authorization: "Bearer " + this.token,
				}),
			}
		)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ Menu: responseJson.Menu });
				this.setState({ filter: "specific" });
				this.setState({ isloading: false });
			})
			.catch((error) => {
				console.error(error);
			});
	};
	getfood = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		axios
			.get(this.foodurl, { headers: headers })
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
	};


	getcount = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};

		axios
			.get("https://digitalbites.herokuapp.com/food/countreport", {
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
		const myname = localStorage.getItem("id");

		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
			rname: myname,
		};

		axios
			.delete(
				"https://digitalbites.herokuapp.com/food/delete/" +
				event.target.value,
				{
					headers: headers,
				}
			)
			.then((response) => {
				this.componentDidMount();
				this.setState({ isLoading: true });
			})
			.catch((error) => {
				console.log(error.toString());
				// this.setState({ toDashboard: true });
			});
	};

	todoList() {
		const { filter } = this.state;
		if (filter === "all") {
			return this.state.todos.map((todos, index) => {
				const { name, category, price, description, image } = todos; //destructuring

				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{name}</td>
						<td>{category}</td>
						<td>{price}</td>

						<td>{description}</td>

						<td>
							<Link
								to={"/prodDetails/" + todos._id}
								style={{ color: "#8E0438" }}
							>
								<i class="fa fa-eye" aria-hidden="true"></i>
							</Link>
						</td>

						<td>
							<Link
								to={"/editfood/" + todos._id}
								style={{ color: "#8E0438" }}
							>
								<FontAwesomeIcon icon={faPencilAlt} />
							</Link>
						</td>
						<td>
							<button
								value={todos._id}
								disabled
								className="btn btn-sm btn-danger"

								onClick={this.handleClickDelete}
							>
								Delete
							</button>
						</td>
					</tr>
				);
			});
		}
		return this.state.Menu.map((todos, index) => {
			const {
				name,
				category,
				price,
				description,
				image,
				_id,
			} = todos.food; //destructuring

			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{name}</td>
					<td>{category}</td>
					<td>{price}</td>

					<td>{description}</td>

					<td>
						<Link
							to={"/prodDetails/" + _id}
							style={{ color: "#8E0438" }}
						>
							<i class="fa fa-eye" aria-hidden="true"></i>
						</Link>
					</td>

					<td>
						<Link
							to={"/editfood/" + _id}
							style={{ color: "#8E0438" }}
						>
							<FontAwesomeIcon icon={faPencilAlt} />
						</Link>
					</td>
					<td>
						<button
							value={_id}
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
		const { restaurants } = this.state;

		let restaurantnames = restaurants.map((v) => (
			<option value={v._id}>{v.name}</option>
		));

		return (
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-4">
							<div className="col-sm-6"></div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/dashboard">Home</a>
									</li>
									<li className="breadcrumb-item active">
										View Menu
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

							<div className="description">
								<label htmlFor="description">
									Apply Filter
								</label>
								<select
									className="form-control"
									value={this.state.rname}
									onChange={this.restaurantChange}
								>
									<option value="all">All Restaurant </option>

									{restaurantnames}
								</select>
							</div>
							<div className="card">
								<div className="card-header">
									<h3 className="card-title">
										Products
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
												<th>Type</th>
												<th>Price</th>

												<th>Description</th>
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
					</div>
					{this.usespinner()}
				</section>
			</div>
		);
	}
}
