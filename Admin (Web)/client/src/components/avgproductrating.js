import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";

import Axios from "axios";

import { Link, Redirect } from "react-router-dom";

export default class avgratin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chartData: {},
		};
		this.token = localStorage.getItem("token");
	}
	componentDidMount() {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};

		Axios.get("https://digitalbites.herokuapp.com/viewreport", {
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
					chartData: {
						labels: labels_,
						datasets: [
							{
								label: "Customers",
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
			<Doughnut
				data={this.state.chartData}
				options={{
					title: {
						display: true,
						text: "Hover Over Charts to View Average food rating",
						fontSize: 20,
					},
					legend: {
						display: true,
						position: "right",
					},
				}}
			/>
		);
	}
}
