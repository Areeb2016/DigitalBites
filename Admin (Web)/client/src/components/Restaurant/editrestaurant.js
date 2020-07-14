import React, { Component } from "react";
import "./editr.css";
import Axios from "axios";
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

class editr extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			contactNumber: "",
			cuisine: "",
			estimatedDeliveryTime: "",
			// openTime: null,
			description: "",
			address: "",

			formErrors: {
				name: "",
				email: "",
				contactNumber: "",

				estimatedDeliveryTime: "",
				// openTime: "",
				description: "",
				address: "",
			},
		};
		this.url = "https://digitalbites.herokuapp.com/restaurant/";
		this.token = localStorage.getItem("token");
	}

	componentDidMount() {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};
		Axios.get(this.url + this.props.match.params.id, { headers: headers })
			.then((response) => {
				console.log(response);
				this.setState({
					name: response.data.name,
					email: response.data.email,
					contactNumber: response.data.contactNumber,

					estimatedDeliveryTime: response.data.estimatedDeliveryTime,
					description: response.data.description,
					address: response.data.address,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const token = localStorage.getItem("token");
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		};
		const url =
			"https://digitalbites.herokuapp.com/restaurant/update/" +
			this.props.match.params.id;

		if (formValid(this.state)) {
			const restaurantdetails = {
				name: this.state.name,
				email: this.state.email,
				contactNumber: this.state.contactNumber,

				estimatedDeliveryTime: this.state.estimatedDeliveryTime,
				description: this.state.description,
				address: this.state.address,
			};


			Axios.patch(url, restaurantdetails, { headers: headers }).then(
				(res) => {
					Message.success("Restaurants details added", 5, {
						position: 'top-right',
						title: 'Successful',
					})
					window.location.href = "/viewRestaurants"
				}
			);
		} else {
			//if the form is invalid then we display the corresponding error message.
			Message.warn("FORM INVALID", 6, {
				position: 'top-right',
				title: 'Unsuccessful',
			})
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
			case "address":
				formErrors.address =
					value.length < 10 ? "minimum 10 characters required" : "";
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
			<div id="wrapper">
				<div id="content-wrapper">
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
							
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/dashboard">Home</a>
									</li>
									<li className="breadcrumb-item">
										<a href="/viewRestaurants">
											View Restaurants
										</a>
									</li>
									<li className="breadcrumb-item active">
										Edit Restaurant Details
									</li>
								</ol>
							</div>
						</div>
					</div>
					{/* /.container-fluid */}
				</section>
				<section className="content">
					<div className="wrapper">
						<div className="form-wrapper" style={{
										width: "600px",
										marginTop: "-30px",
										borderStyle: "solid",
									}}> 
							<h1>Edit Restaurant Details</h1>
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
										value={this.state.name}
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
										value={this.state.email}
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
										value={this.state.contactNumber}
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
										value={this.state.estimatedDeliveryTime}
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
										value={this.state.description}
										onChange={this.handleChange}
									/>
									{formErrors.description.length > 0 && (
										<span className="errorMessage">
											{formErrors.description}
										</span>
									)}
								</div>
								<div className="address">
									<label htmlFor="address">Address*</label>
									<input
										className={
											formErrors.address.length > 0
												? "error"
												: null
										}
										placeholder="Address"
										type="text"
										name="address"
										noValidate
										value={this.state.address}
										onChange={this.handleChange}
									/>
									{formErrors.address.length > 0 && (
										<span className="errorMessage">
											{formErrors.address}
										</span>
									)}
								</div>

								<div className="outer">
              
            <div className="createAccount">
              <button type="submit">Update</button>
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
			</div>
		);
	}
}

export default editr;
