import React, { Component } from "react";
import "./login.css";
import axios from "axios";

import { Message } from 'shineout'


const emailRegex = RegExp(
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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

class login extends Component {
	constructor(props) {
		//passing properties to the constructor.
		super(props); //extending the component so have to call "super".

		this.state = {
			//contains all the form fields. can either be null or just simply empty strings.

			email: null,
			password: "",

			redirect: false,
			formErrors: {
				//holds the errors that are likely to pop up.

				email: "",
				password: "",
			},
		};
	}

	renderRedirect = () => {
		if (this.state.redirect) {

			setTimeout(() => {
				if (this.state.redirect) {
					window.location.href = "/dashboard"
				}
			}, 1000)
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ isLoading: true });

		if (formValid(this.state)) {
			//if the form is valid then we pass the values.
			this.setState({ isLoading: true });
			const url = "https://digitalbites.herokuapp.com/signin";
			const login = {
				email: this.state.email,
				password: this.state.password,
			};

			axios
				.post(url, login)
				.then((result) => {
					localStorage.setItem("token", result.data.token);
					this.setState({ redirect: true, isLoading: false });
					localStorage.setItem("isLoggedIn", true);

					Message.success("Loginsuccessfully ", 6, {
						position: 'top-right',
						title: 'Successful',
					})
				})
				.catch((error) => {
					Message.error(error);
				});
		} else {
			//if the form is invalid then we display the corresponding error message.
			Message.error("FORM INVALID", 5, {
				position: 'top-right',
				title: 'Unsuccessful',
			})
		}
	};

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
			case "password":
				formErrors.password =
					value.length < 6
						? "Password has to be more than 6 characters!"
						: "";
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
			<div>
				<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
					<header
						className="mdl-layout__header"
						style={{ background: "#8E0438" }}
					>
						<div className="mdl-layout__header-row">
							{/* Title */}
							<span className="mdl-layout-title">
								Welcome to Digital Bites
							</span>
							{/* Add spacer, to align navigation to the right */}
							<div className="mdl-layout-spacer" />
							{/* Navigation. We hide it in small screens. */}
							<nav className="mdl-navigation mdl-layout--large-screen-only">
								<a
									className="mdl-navigation__link"
									href="/"
								>
									Home
								</a>
								<a
									className="mdl-navigation__link"
									href="/services"
								>
									Services
								</a>
								<a
									className="mdl-navigation__link"
									href="/login"
								>
									Sign In
								</a>
								<a className="mdl-navigation__link" href="/faqs">
									Faqs
								</a>
							</nav>
						</div>
					</header>
				</div>
				<div className="wrapper">
					<div className="form-wrapper">
						<h1 style={{ textDecoration: "underline" }}>
							Admin Login
						</h1>
						<form onSubmit={this.handleSubmit} noValidate>
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
							<div className="password">
								<label htmlFor="password">Password*</label>
								<input
									className={
										formErrors.password.length > 0
											? "error"
											: null
									}
									placeholder="Password"
									type="password"
									name="password"
									noValidate
									onChange={this.handleChange}
								/>
								{formErrors.password.length > 0 && (
									<span className="errorMessage">
										{formErrors.password}
									</span>
								)}
							</div>

							<div className="dont">
								Don't have an account?
								<a href="/reg"> Register here!</a>
							</div>
							<div className="outer">
								{/* <div className="refresh">
									<button>Refresh</button>
								</div> */}
								<div className="loginn">
									{this.renderRedirect()}

									<button type="submit">Login</button>
								</div>
								<div className="cancel">
									<button>Cancel</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default login;
