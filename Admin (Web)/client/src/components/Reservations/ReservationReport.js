import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";

import Axios from "axios";
import ReactToPrint from "react-to-print";
import { Spin } from 'shineout'

import { Link, Redirect } from "react-router-dom";

export class Index extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chartData: {},
			value: "",
			isloading: true,
		};
		this.token = localStorage.getItem("token");
	}

	handleChange = (event) => {
		this.setState({ value: event.target.value });
		this.setState({ isloading: true });
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
			product: event.target.value,
		};

		Axios.get(
			"https://digitalbites.herokuapp.com/reservation/reservationreport",

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
					isloading: false,
					chartData: {

						labels: labels_,
						datasets: [
							{
								label: "Customers",
								data: data_,
								backgroundColor: [
									"#488f31",
									"#83af70",
									"#bad0af",
									" #808000",
								],
								hoverBackgroundColor: [
									"#488f31",
									"#83af70",
									"#bad0af",
									" #808000",
								],
							},
						],
					},
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};
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
			product: this.state.value,
		};

		Axios.get(
			"https://digitalbites.herokuapp.com/reservation/reservationreport",

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
					isloading: false,
					chartData: {

						labels: labels_,
						datasets: [
							{
								label: "Customers",
								data: data_,
								backgroundColor: [
									"#488f31",
									"#83af70",
									"#bad0af",
									" #808000",
								],
								hoverBackgroundColor: [
									"#488f31",
									"#83af70",
									"#bad0af",
									" #808000",
								],
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
			<div className="content-wrapper">
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
										Reservation Report
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
							<div className="card mb-3">
								<div>
									<select
										className="form-control"
										value={this.state.value}
										onChange={this.handleChange}
									>
										<option value="duration">
											{" "}
											Select Duration
										</option>
										<option value="daily">
											{" "}
											Daily Report
										</option>
										<option value="weekly">
											{" "}
											Weekly Report
										</option>
										<option value="monthly">
											{" "}
											Monthly Report
										</option>
										<option value="yearly">
											Yearly Report
										</option>
									</select>
								</div>

								<div>
									<Pie
										data={this.state.chartData}
										options={{
											title: {
												display: true,
												text:
													"Hover Over Charts to View percentages",
												fontSize: 20,
											},
											legend: {
												display: true,
												position: "right",
											},
										}}
									/>
								</div>
								{this.usespinner()}
							</div>
						</div>
					</div>

				</section>
			</div>
		);
	}
}

export default class Example extends React.Component {
	render() {
		return (
			<div>
				<ReactToPrint
					content={() => this.componentRef}
					trigger={() => (
						<i
							style={{ marginLeft: 1300 }}
							class="fas fa-print fa-2x"
						></i>
					)}
				/>
				<Index ref={(el) => (this.componentRef = el)} />
			</div>
		);
	}
}
