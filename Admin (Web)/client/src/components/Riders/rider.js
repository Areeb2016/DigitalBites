import React, { Component } from "react";
import "./rider.css";
import Axios from "axios";
import { Message } from 'shineout'

const emailRegex = RegExp(
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneNumberRegex = RegExp(
	/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
);

const formValid = ({ formErrors, ...rest }) => {
	//form valid function.
	let valid = true;

	// validate form errors being empty
	Object.values(formErrors).forEach((val) => {
		val.length > 0 && (valid = false);
	});

	// validate the form was filled out
	Object.values(rest).forEach((val) => {
		val === null && (valid = false);
	});

	return valid;
};

export default class contactus extends Component {
	constructor(props) {
		//passing properties to the constructor.
		super(props); //extending the component so have to call "super".

		this.state = {
			//contains all the form fields. can either be null or just simply empty strings.

			name: null,

			email: null,
			phoneNumber: null,
			notes: null,
			restaurants: [],
			rname: "none",
			Address: "",
			transport: "",

			formErrors: {
				//holds the errors that are likely to pop up.
				name: "",

				email: "",
				phoneNumber: "",
				notes: "",
			},
		};
		this.url = "https://digitalbites.herokuapp.com/restaurant/R";
		this.token = localStorage.getItem("token");
		this.restaurantChange = this.restaurantChange.bind(this);
		this.radioChangeHandler = this.radioChangeHandler.bind(this);
	}

	radioChangeHandler = (event) => {
		this.setState({
			transport: event.target.value,
		});
	};



	handleSubmit = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const url = "https://digitalbites.herokuapp.com/rider";
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		};
		if (formValid(this.state)) {

			const Rider = {
				name: this.state.name,
				email: this.state.email,
				phoneNumber: this.state.phoneNumber,
				password: this.state.notes,
				restaurantname: this.state.rname,
				Address: this.state.Address,
				transport: this.state.transport,
			};


			Axios.post(url, Rider, { headers: headers })
				.then((res) => {
					Message.success("Rider successfully added", 6, {
						position: 'top-right',
						title: 'Successful',
					})
					window.location.href = "/viewRiders"

				})
				.catch((error) => {
					Message.error(error);
				});
		} else {
			//if the form is invalid then we display the corresponding error message.

			Message.error("FORM INVALID", 6, {
				position: 'top-right',
				title: 'Unsuccessful',
			})
		}
	};
	restaurantChange(event) {
		this.setState({ rname: event.target.value });
	}

	componentDidMount() {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};

		Axios.get(this.url, { headers: headers })
			.then((response) => {
				const rider = response.data;
				console.log(response);
				this.setState({ restaurants: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target; //destructuring both name and its value.
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case "email":
				formErrors.email = emailRegex.test(value)
					? ""
					: "Invalid email address";
				break;
			case "name":
				formErrors.name =
					value.length < 4 ? "Minimum 4 characters required." : "";
				break;

			case "phoneNumber":
				formErrors.phoneNumber = phoneNumberRegex.test(value)
					? ""
					: "Invalid phone number";
				break;
			case "notes":
				formErrors.notes =
					value.length < 6 ? "Minimum 6 characters required." : "";
				break;

			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () =>
			console.log(this.state)
		);
	};

	render() {
		const { formErrors, restaurants } = this.state;
		let restaurantnames = restaurants.map((v) => (
			<option value={v.name}>{v.name}</option>
		));
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
										Add Rider
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
							<div className="wrapper">
								<div
									className="form-wrapper"
									style={{
										width: "600px",
										marginTop: "-50px",
										borderStyle: "solid",
									}}
								>
									<h2> Add Rider</h2>
									<form
										onSubmit={this.handleSubmit}
										noValidate
									>
										<div className="restaurant">
											<label htmlFor="description">
												Pick restaurant*
											</label>
											<select
												className="form-control"
												value={this.state.rname}
												onChange={this.restaurantChange}
											>
												<option>
													Select Restaurant
												</option>
												{restaurantnames}
											</select>
										</div>

										<div className="name">
											<label htmlFor="name">Name*</label>
											<input
												className={
													formErrors.name.length > 0
														? "error"
														: null
												}
												placeholder="Name"
												type="text"
												name="name"
												noValidate
												onChange={this.handleChange}
											/>
											{formErrors.name.length > 0 && (
												<span className="errorMessage">
													{formErrors.name}
												</span>
											)}
										</div>

										<div className="email">
											<label htmlFor="email">
												Email*
											</label>
											<input
												className={
													formErrors.email.length > 0
														? "error"
														: null
												}
												placeholder="Email"
												type="text"
												name="email"
												noValidate
												onChange={this.handleChange}
											/>
											{formErrors.email.length > 0 && (
												<span className="errorMessage">
													{formErrors.email}
												</span>
											)}
										</div>
										<div className="phoneNumber">
											<label htmlFor="phoneNumber">
												Phone Number*
											</label>
											<input
												className={
													formErrors.phoneNumber
														.length > 0
														? "error"
														: null
												}
												placeholder="Phone Number"
												type="text"
												name="phoneNumber"
												noValidate
												onChange={this.handleChange}
											/>
											{formErrors.phoneNumber.length >
												0 && (
													<span className="errorMessage">
														{formErrors.phoneNumber}
													</span>
												)}
										</div>

										<div className="password">
											<label htmlFor="notes">
												Password*
											</label>
											<input
												className={
													formErrors.notes.length > 0
														? "error"
														: null
												}
												placeholder="Password"
												type="text"
												name="notes"
												noValidate
												onChange={this.handleChange}
											/>
											{formErrors.notes.length > 0 && (
												<span className="errorMessage">
													{formErrors.notes}
												</span>
											)}
										</div>

										<div className="transport">
											<label>Transport*</label>
											<input
												type="radio"
												value="yes"
												checked={
													this.state.transport ===
													"yes"
												}
												onChange={
													this.radioChangeHandler
												}
											/>
											Yes
											<input
												type="radio"
												value="no"
												checked={
													this.state.transport ===
													"no"
												}
												onChange={
													this.radioChangeHandler
												}
											/>{" "}
											No
										</div>

										<div className="address">
											<label htmlFor="notes">
												Address*
											</label>
											<input
												className={
													formErrors.notes.length > 0
														? "error"
														: null
												}
												placeholder="Enter Address"
												type="text"
												name="Address"
												noValidate
												onChange={this.handleChange}
											/>
											{formErrors.notes.length > 0 && (
												<span className="errorMessage">
													{formErrors.notes}
												</span>
											)}
										</div>

										<div
											className="outer"
											style={{ marginTop: "-20px" }}
										>
											<div className="loginn">
												<button
													type="submit"
													style={{
														display: "inline-block",
													}}
												>
													Submit
												</button>
											</div>
											<div className="cancel">
												<button
													type="submit"
													style={{
														display: "inline-block",
													}}
												>
													Cancel
												</button>

											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
