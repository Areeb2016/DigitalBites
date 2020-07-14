import React, { Component } from "react";
import "./restaurantdetails.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Message } from 'shineout'
const emailRegex = RegExp(
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const contactNumberRegex = RegExp(
	/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
);

const formValid = ({ formErrors, ...rest }) => {
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

export default class restaurant extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			email: null,
			contactNumber: null,

			estimatedDeliveryTime: null,

			description: null,

			selectedFile: [],
			redirect: false,

			formErrors: {
				name: "",
				email: "",
				contactNumber: "",

				estimatedDeliveryTime: "",

				description: "",
			},
		};
	}

	onChangeHandler = (event) => {
		this.setState({
			selectedFile: this.state.selectedFile.concat(event.target.files[0]),
			loaded: 0,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (formValid(this.state) && this.state.selectedFile.length > 1) {
			Message.success("Restaurants details added", 5, {
				position: 'top-right',
				title: 'Successful',
			})
			this.setRedirect();
		} else {
			Message.warn("FORM INVALID", 6, {
				position: 'top-right',
				title: 'Unsuccessful',
			})
		}
	};
	setRedirect = () => {
		this.setState({
			redirect: true,
		});
	};
	renderRedirect = () => {
		if (this.state.redirect) {
			return (
				<Redirect
					to={{
						pathname: "/restaurantlocation",

						state: {
							description: this.state.description,
							name: this.state.name,
							contactNumber: this.state.contactNumber,
							estimatedDeliveryTime: this.state
								.estimatedDeliveryTime,
							email: this.state.email,
							file: this.state.selectedFile,
						},
					}}
				/>
			);
		}
	};

	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case "name":
				formErrors.name =
					value.length < 3 ? "minimum 3 characaters required" : "";
				break;
			case "contactNumber":
				formErrors.contactNumber = contactNumberRegex.test(value)
					? ""
					: "invalid contact number";
				break;
			case "email":
				formErrors.email = emailRegex.test(value)
					? ""
					: "invalid email address";
				break;

			case "estimatedDeliveryTime":
				formErrors.estimatedDeliveryTime =
					value.length > 2 ? "at most 2 characters required" : "";
				break;

			case "description":
				formErrors.description =
					value.length < 10 ? "minimum 10 characaters required" : "";
				break;

			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () =>
			console.log(this.state)
		);
	};

	render() {
		const { formErrors } = this.state;
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
										Add Restaurant
									</li>
								</ol>
							</div>
						</div>
					</div>
					{/* /.container-fluid */}
				</section>
				<section className="content">
					<div className="wrapper">
						<div
							className="form-wrapper"
							style={{
								width: "600px",
								marginTop: "-50px",
								borderStyle: "solid",
							}}
						>
							<h2>Add Restaurant Details</h2>
							<form onSubmit={this.handleSubmit} noValidate>
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
									<label htmlFor="email">Email*</label>
									<input
										className={
											formErrors.email.length > 0
												? "error"
												: null
										}
										placeholder="Email"
										type="email"
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
								<div className="contactNumber">
									<label htmlFor="contactNumber">
										Contact Number*
									</label>
									<input
										className={
											formErrors.contactNumber.length > 0
												? "error"
												: null
										}
										placeholder="Contact Number"
										type="text"
										name="contactNumber"
										noValidate
										onChange={this.handleChange}
									/>
									{formErrors.contactNumber.length > 0 && (
										<span className="errorMessage">
											{formErrors.contactNumber}
										</span>
									)}
								</div>

								<div className="estimatedDeliveryTime">
									<label htmlFor="estimatedDeliveryTime">
										Estimated Delivery Time(minutes)*
									</label>
									<input
										className={
											formErrors.estimatedDeliveryTime
												.length > 0
												? "error"
												: null
										}
										placeholder="Estimated Delivery Time"
										type="text"
										name="estimatedDeliveryTime"
										noValidate
										onChange={this.handleChange}
									/>
									{formErrors.estimatedDeliveryTime.length >
										0 && (
											<span className="errorMessage">
												{formErrors.estimatedDeliveryTime}
											</span>
										)}
								</div>
								{/* <div className="openTime">
              <label htmlFor="openTime">Restaurant Open Timing*</label>
              <input
              
                type="time"
                name="openTime"
                noValidate
                onChange={this.handleChange}
              />
              
            </div> */}

								<div className="description">
									<label htmlFor="description">
										Description*
									</label>
									<input
										className={
											formErrors.description.length > 0
												? "error"
												: null
										}
										placeholder="Description"
										type="text"
										name="description"
										noValidate
										onChange={this.handleChange}
									/>
									{formErrors.description.length > 0 && (
										<span className="errorMessage">
											{formErrors.description}
										</span>
									)}
								</div>

								<div className="file1">
									<div className="row">
										<div className="col-md-6">
											<div className="form-group files">
												<label>Upload Restaurant Image </label>
												<input
													type="file"
													name="file"
													onChange={
														this.onChangeHandler
													}
												/>
											</div>

											<div className="file2">
												<label>Upload VR Image </label>
												<input
													type="file"
													name="file"
													onChange={
														this.onChangeHandler
													}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="outer">

									<div className="createAccount">
										<button type="submit">Submit</button>
										{this.renderRedirect()}
									</div>
									<div className="cancel">

										<button>Cancel</button>

									</div>

								</div>
							</form>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
