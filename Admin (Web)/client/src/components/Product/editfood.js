import React, { Component } from "react";

import "./productdetails.css";
import Axios from "axios";
import { Message } from 'shineout'
import { Spin } from 'shineout'

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

class productdetails extends Component {
	constructor(props) {
		super(props);
		this.url = "https://digitalbites.herokuapp.com/restaurant/R";
		this.token = localStorage.getItem("token");
		this.categoryurl = "https://digitalbites.herokuapp.com/food/category";

		// this.onSubmit= this.onSubmit.bind(this);
		this.state = {
			foodName: null,

			price: null,
			description: " ",
			foodType: "",
			selectedFile: "",
			restaurants: [],
			Categories: [],
			duration: " ",
			serving: " ",
			rname: "none ",
			isloading: true,
			category: " ",

			formErrors: {
				foodName: "",
				price: "",
				description: "",
			},
		};
	}



	componentDidMount() {
		this.getrestaurant();
		this.getcaategory();
		this.getfood();
	}
	usespinner = () => {

		if (this.state.isloading) {
			return (
				<Spin size="54px" name="four-dots" color="#dc3545" />
			);
		}
	}
	getrestaurant = () => {
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
	};
	getcaategory = () => {
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + this.token,
		};

		Axios.get(this.categoryurl, { headers: headers })
			.then((response) => {
				console.log(response);
				this.setState({ Categories: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	getfood = () => {
		Axios.get(
			"https://digitalbites.herokuapp.com/food/" +
			this.props.match.params.id
		) //check the localhost link
			.then((response) => {
				console.log(response);
				this.setState({
					isloading: false,
					foodName: response.data.name,
					price: response.data.price,
					description: response.data.description,
					serving: response.data.Serving,
					category: response.data.category,
					duration: response.data.Duration,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	onChangeHandler = (event) => {
		this.setState({
			selectedFile: event.target.files,
			loaded: 0,
		});
	};

	restaurantChange = (event) => {
		this.setState({ rname: event.target.value });
	};
	categoryselected = (event) => {
		this.setState({ category: event.target.value });
	};
	durationselected = (event) => {
		this.setState({ duration: event.target.value });
	};
	servingselected = (event) => {
		this.setState({ serving: event.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const url =
			"https://digitalbites.herokuapp.com/food/update/" +
			this.props.match.params.id;

		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		};
		if (formValid(this.state)) {
			const data = {
				category: this.state.category,
				name: this.state.foodName,
				price: this.state.price,
				description: this.state.description,
				duration: this.state.duration,
				serving: this.state.serving,
			};

			Axios.patch(url, data, { headers: headers })
				.then((res) => {
					Message.success("Menu successfully Updated", 6, {
						position: 'top-right',
						title: 'Successful',
					})
					window.location.href = "/viewMenus"

				})
				.catch((error) => {
					Message.error(error)
				});
		} else {
			Message.warn("FORM INVALID", 6, {
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
			case "foodName":
				formErrors.foodName =
					value.length < 4 ? "Minimum 4 characters required." : "";
				break;
			case "price":
				formErrors.price =
					value.length < 2 ? "minimum 3 characaters required" : "";
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
		const { formErrors, restaurants, Categories } = this.state;

		let restaurantnames = restaurants.map((v) => (
			<option value={v.name}>{v.name}</option>
		));

		let category = Categories.map((v) => (
			<option value={v.name}>{v.name}</option>
		));

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
									<li className="breadcrumb-item">
										<a href="/viewMenus">View Menus</a>
									</li>
									<li className="breadcrumb-item active">
										Update Product
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
								<div className="form-wrapper" style={{
										width: "600px",
										marginTop: "-30px",
										borderStyle: "solid",
									}}>
									<h1> Update Product</h1>
									<form
										onSubmit={this.handleSubmit}
										noValidate
									>
										<div className="description">
											<label htmlFor="description">
												Pick Category*
											</label>
											<select
												className="form-control"
												value={this.state.category}
												onChange={this.categoryselected}
											>
												<option value="Select Category">
													Select Category*
												</option>

												{category}
											</select>
										</div>

										<div className="description">
											<label htmlFor="duration">
												Pick Cooking Duration
											</label>
											<select
												className="form-control"
												value={this.state.duration}
												onChange={this.durationselected}
											>
												<option value="Pick Cooking Duration">
													Pick Cooking Duration
												</option>
												<option value="10-15 mins">
													10-15 mins
												</option>
												<option value="15-20 mins">
													15-20 mins
												</option>
												<option value="20-30 mins">
													20-30 mins
												</option>
												<option value="30-40 mins">
													30-40 mins
												</option>
												<option value="40-50 mins">
													40-50 mins
												</option>
											</select>
										</div>

										{/* <div className="description">
                <label htmlFor="foodtype">Pick Cooking Duration</label>
                <select className="form-control" value={this.state.category} onChange={this.categoryselected}>
                <option disabled>Pick Food Type</option>
                  <option value="10-15 mins">Veg</option>
                  <option value="15-20 mins">Non veg</option>
                  <option value="20-30 mins">white Meat</option>
                  <option value="30-40 mins">Red Meat</option>
                  
                
       
        </select>
      
             
                
               
              </div> */}

										<div className="description">
											<label htmlFor="serving">
												Persons serving
											</label>
											<select
												className="form-control"
												value={this.state.serving}
												onChange={this.servingselected}
											>
												<option>Pick Serving</option>
												<option value="1-2 person">
													1-2 person
												</option>
												<option value="2-3 persons">
													2-3 persons
												</option>
												<option value="4-5 persons">
													4-5 persons
												</option>
											</select>
										</div>
										<div className="foodName">
											<label htmlFor="foodName">
												Food Name*
											</label>
											<input
												className={
													formErrors.foodName.length >
														0
														? "error"
														: null
												}
												placeholder="Food Name"
												type="text"
												name="foodName"
												value={this.state.foodName}
												noValidate
												onChange={this.handleChange}
											/>
											{formErrors.foodName.length > 0 && (
												<span className="errorMessage">
													{formErrors.foodName}
												</span>
											)}
										</div>
										<div className="price">
											<label htmlFor="price">
												Price*
											</label>
											<input
												className={
													formErrors.price.length > 0
														? "error"
														: null
												}
												placeholder="Price"
												type="text"
												name="price"
												value={this.state.price}
												noValidate
												onChange={this.handleChange}
											/>
											{formErrors.price.length > 0 && (
												<span className="errorMessage">
													{formErrors.price}
												</span>
											)}

											<div className="description">
												<label htmlFor="description">
													Description*
												</label>
												<input
													className={
														formErrors.description
															.length > 0
															? "error"
															: null
													}
													placeholder="Description"
													type="text"
													name="description"
													value={
														this.state.description
													}
													noValidate
													onChange={this.handleChange}
												/>
												{formErrors.description.length >
													0 && (
														<span className="errorMessage">
															{formErrors.description}
														</span>
													)}
											</div>
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
							{this.usespinner()}
						</div>
					</div>

				</section>
			</div>
		);
	}
}

export default productdetails;
