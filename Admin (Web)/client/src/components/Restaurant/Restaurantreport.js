import React from "react";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

import Axios from "axios";
import { Spin } from 'shineout'
import { Link, Redirect } from "react-router-dom";
import ReactToPrint from "react-to-print";
export class Index extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chartData: {},
			isloading: true,
		};
		this.token = localStorage.getItem("token");
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

		Axios.get("https://digitalbites.herokuapp.com/restaurant/Lreport", {
			headers: headers,
		}) //check the localhost link
			.then((response) => {
				return response;
			})
			.then((res) => {
				console.log(res);
				var labels_ = [];
				var data_ = [];
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
								label: "Locations",
								data: data_,
								backgroundColor: [
									"#006400",
									"#B21F00",

									"#C9DE00",
									"#2FDE00",
								],
								hoverBackgroundColor: [
									"#501800",
									"#4B5000",
									"#175000",
									"#003350",
									"#35014F",
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
										Restaurant Report
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
								<Bar
									data={this.state.chartData}
									options={{
										responsive: true,
										title: { text: "Locations", display: true },
										scales: {
											yAxes: [
												{
													ticks: {
														autoSkip: true,
														maxTicksLimit: 5,
														beginAtZero: true
													},
													gridLines: {
														display: false
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
						</div>
						{this.usespinner()}
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
