import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";

import Axios from "axios";
import { Spin } from 'shineout'


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

		Axios.get("https://digitalbites.herokuapp.com/food/report", {
			headers: headers,
		}) //check the localhost link

			.then((res) => {
				console.log(res);
				let labels_ = [];
				let data_ = [];

				for (const dataObj of res.data) {
					labels_.push(dataObj._id);

					data_.push(dataObj.count);
				}
				this.setState({
					isloading: false,
					chartData: {
						labels: labels_,
						datasets: [
							{
								label: "Cuisines",
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
										Cuisines Report
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
						
						{
							<div>
								<Doughnut
									data={this.state.chartData}
									options={{
										title: {
											display: true,
											text:
												"Hover Over Charts to View Category Type",
											fontSize: 20,
										},
										legend: {
											display: true,
											position: "right",
										},
									}}
								/>
							</div>
						}
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
