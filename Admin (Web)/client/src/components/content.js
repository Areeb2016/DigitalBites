import React, { Component } from "react";

import { Bar, Line } from "react-chartjs-2";
import Moment from 'react-moment';
import Axios from "axios";
import { Spin } from 'shineout'

export default class Content extends Component {
	// componentDidMount() {

	constructor(props) {
		super(props);

		this.state = {
			chartData: {},
			value: "",
			todos: [],
			isloading: true,

		};
		this.token = localStorage.getItem("token");
		this.url = "https://digitalbites.herokuapp.com/orders/";
	}
	usespinner = () => {

		if (this.state.isloading) {
			return (
				<Spin size="54px" name="four-dots" color="#dc3545" />
			);
		}
	};
	getreservations = () => {

		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		Axios
			.get(this.url, { headers: headers })

			.then((response) => {
				this.setState({ todos: response.data });

				this.setState({ isloading: false });
			})
			.catch((error) => {

				console.log(error);
			});
	};

	todoList() {

		return this.state.todos.map((todos, index) => {
			const { assighnedto, status, createdAt, createdBy } = todos; //destructuring
			return (
				<tr key={index}>
					<td>{index + 1}</td>

					<td>{status}</td>
					<td>{assighnedto}</td>

					<td> <Moment date={createdAt} /> </td>
					<td>{createdBy}</td>

				</tr>
			);
		});



		//  })
	}
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
	componentDidMount = () => {
		this.getreservations();




		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
			product: this.state.value,
		};

		Axios.get(
			"https://digitalbites.herokuapp.com/orders/report",

			{
				headers: headers,
			}
		) //check the localhost link
			.then((response) => {
				return response;
			})
			.then((res) => {
				console.log(res);
				var labels_ = [];
				var data_ = [];
				labels_.length = 0;
				data_.length = 0;
				res.data.map((key, index) => {
					labels_.push(key._id);
					data_.push(key.count);
				});
				this.setState({
					chartData: {
						labels: labels_,
						datasets: [
							{
								label: "Orders",
								data: data_,
								backgroundColor: [
									'rgba(255, 99, 132, 0.6)',
									'rgba(54, 162, 235, 0.6)',
									'rgba(255, 206, 86, 0.6)',
									'rgba(75, 192, 192, 0.6)',
									'rgba(153, 102, 255, 0.6)',
									'rgba(255, 159, 64, 0.6)',
									'rgba(255, 99, 132, 0.6)'
								]
							},
						],
					},
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}


	render() {
		return (
			<div className="main">
				<div>
					<div className="content-wrapper">
						{/* Content Header (Page header) */}

						{/* Main content */}
						<section className="content">
							<div className="container-fluid">
								<div className="row">
									<div className="col-12">
										{/* Small boxes (Stat box) */}
										<div className="row">
											<div className="col-lg-3 col-6">
												{/* small box */}
												<div className="small-box bg-info">
													<div className="inner">
														<h3>15</h3>
														<p>Total Orders</p>
													</div>
													<div className="icon">
														<i className="ion ion-checkmark" />
													</div>
												</div>
											</div>
											{/* ./col */}
											<div className="col-lg-3 col-6">
												{/* small box */}
												<div className="small-box bg-success">
													<div className="inner">
														<h3>13</h3>
														<p>Total Riders</p>
													</div>
													<div className="icon">
														<i className="ion ion-person" />
													</div>
												</div>
											</div>
											{/* ./col */}
											<div className="col-lg-3 col-6">
												{/* small box */}
												<div className="small-box bg-warning">
													<div className="inner">
														<h3>5</h3>
														<p>Total Cuisines</p>
													</div>
													<div className="icon">
														<i className="ion ion-pizza" />
													</div>
												</div>
											</div>
											{/* ./col */}
											<div className="col-lg-3 col-6">
												{/* small box */}
												<div className="small-box bg-danger">
													<div className="inner">
														<h3>50</h3>
														<p>New Orders</p>
													</div>
													<div className="icon">
														<i className="ion ion-beer" />
													</div>
												</div>
											</div>
											{/* ./col */}
										</div>
										{/* BAR CHART */}
										<div className="card card-info">
											<div className="card-header">
												<h3 className="card-title">
													Bar Chart
												</h3>
												<div className="card-tools">
													<button
														type="button"
														className="btn btn-tool"
														data-card-widget="collapse"
													>
														<i className="fas fa-minus" />
													</button>
												</div>
											</div>
											<div className="card-body">
												<div className="chart">

													<Bar

														style={{
															minHeight: 250,
															height: 250,
															maxHeight: 250,
															maxWidth: "100%",
														}}
														data={this.state.chartData}
														options={{
															responsive: true,
															title: { text: "Orders", display: true },
															scales: {
																yAxes: [
																	{
																		ticks: {
																			autoSkip: true,
																			maxTicksLimit: 10,
																			beginAtZero: true
																		},
																		gridLines: {
																			display: true
																		}
																	}
																],
																xAxes: [
																	{
																		gridLines: {
																			display: false
																		}
																	}
																]
															}
														}}
													/>



												</div>
											</div>
											{/* /.card-body */}
										</div>
										{/* /.card */}

										<div className="card">
											<div className="card-header">
												<h3 className="card-title">
													New Orders
												</h3>
											</div>
											{/* /.card-header */}
											<div className="card-body">
												<table
													id="example1"
													className="table table-bordered table-striped"
												>
													<thead>
														<tr>
															<th>Order#</th>
															<th>Status</th>
															<th>Rider</th>
															<th>
																Createdat
															</th>
															<th>createdBy</th>
														</tr>
													</thead>
													<tbody>
														{this.todoList()}
													</tbody>

												</table>
											</div>
											{/* /.card-body */}
										</div>
										{/* /.card */}
									</div>
									{/* /.col */}
								</div>
								{/* /.row */}
							</div>
							{/* /.container-fluid */}
						</section>
						{this.usespinner()}
						{/* /.content */}
					</div>
				</div>
			</div>
		);
	}
}
