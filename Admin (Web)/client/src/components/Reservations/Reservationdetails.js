import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Spin } from 'shineout'
import { Message } from 'shineout'
export default class reservationDetails extends Component {
	constructor(props) {
		super(props);
		this.url = "https://digitalbites.herokuapp.com/reservation/";
		this.token = localStorage.getItem("token");

		this.state = {
			id: "",



			name: "",
			rstatus: "",
			Mobileno: "",
			Date: "",
			Time: "",
			Tpeoples: "",
			Instructions: "",
			status: "confirmed",
			cancelstatus: "cancelled",
			isloading: true,
		};
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
		const id = this.props.match.params.id;

		axios
			.get(this.url + id, { headers: headers })
			.then((response) => {
				const emp = response.data;
				this.setState({ isloading: false });

				this.setState({ name: emp.name });
				this.setState({ Mobileno: emp.Mobileno });

				// this.setState({Instructions: emp.Instructions});
				this.setState({ Date: emp.Date });
				this.setState({ Time: emp.Time });
				this.setState({ rstatus: emp.status });
				this.setState({ Tpeoples: emp.Tpeoples });
			})
			.catch((error) => {
				// this.setState({ toDashboard: true });
				console.log(error);
			});
	}

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to="/dashboard" />;
		}
	};
	handleClickconfirm = () => {
		const { status, Mobileno } = this.state;
		this.setState({ status: "confirmed" });
		const token = localStorage.getItem("token");
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		};
		const url =
			"https://digitalbites.herokuapp.com/reservation/update/" +
			this.props.match.params.id;

		axios
			.patch(
				url,
				{ status: status, Mobileno: Mobileno },
				{ headers: headers }
			)
			.then((result) => {
				Message.success("Reservation confirmed sucessful ", 6, {
					position: 'top-right',
					title: 'Successful',
				})
				this.componentDidMount();
			})
			.catch((error) => {
				Message.error("Status not updated", 6, {
					position: 'top-right',
					title: 'Unsuccessful',
				})
			});
	};
	handleClickcancel = () => {
		const { cancelstatus, Mobileno } = this.state;
		this.setState({ cancelstatus: "cancelled" });
		const token = localStorage.getItem("token");
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		};
		const url =
			"https://digitalbites.herokuapp.com/reservation/cancel/" +
			this.props.match.params.id;

		axios
			.patch(
				url,
				{ status: cancelstatus, Mobileno: Mobileno },
				{ headers: headers }
			)
			.then((result) => {
				Message.success("Reservation cancelled sucessful ", 6, {
					position: 'top-right',
					title: 'Successful',
				})
				this.componentDidMount();
			})
			.catch((error) => {
				Message.error("Status not updated", 6, {
					position: 'top-right',
					title: 'Unsuccessful',
				})
			});
	};
	render() {
		const { name, Mobileno, Tpeoples, Date, Time, status, rstatus } = this.state;
		const isLoading = this.state.isLoading;
		if (this.state.toDashboard === true) {
			return <Redirect to="/" />;
		}
		return (
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1>Reservation Details</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/dashboard">Home</a>
									</li>
									<li className="breadcrumb-item">
										<a href="/viewReservations">
											View Reservations
										</a>
									</li>
									<li className="breadcrumb-item active">
										Reservation Details
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
											<i className="fas fa-clipboard-check" />
											Reservation Details
										</h3>
									</div>
									{/* /.card-header */}
									<div className="card-body">
										<dl>
											<dt>Name</dt>
											<dd>{name}.</dd>
											<dt>Contact Number</dt>
											<dd>{Mobileno}.</dd>
											<dt>Date</dt>
											<dd>{Date}.</dd>
											<dt>Time</dt>
											<dd>{Time}.</dd>
											<dt>Number of People</dt>
											<dd>{Tpeoples}.</dd>
											<dt>Status</dt>
											<dd>{rstatus}.</dd>
										</dl>
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
											<dt></dt>
											<dd>
												{" "}
												<button
													type="button"
													class="btn btn-block btn-primary btn-lg"
													onClick={
														this.handleClickconfirm
													}
												>
													Confirm Reservation
												</button>
											</dd>
											<dt></dt>
											<dd>
												{" "}
												<button
													type="button"
													class="btn btn-block btn-danger btn-lg"
													onClick={
														this.handleClickcancel
													}
												>
													Cancel Reservation
												</button>
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
