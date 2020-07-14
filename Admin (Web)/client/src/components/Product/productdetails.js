import React, { Component } from "react";
import { RadioGroup, Radio } from "react-mdl";
import "./productdetails.css";
import Axios from "axios";
import Sidebar from "../elements/sidebar";

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
			description: null,
			foodType: "",
			selectedFile: "",
			restaurants: [],
			Categories: [],
			duration: "none",
			serving: "none",
			rname: "none",
			category: "none",

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
		const url = "https://digitalbites.herokuapp.com/food";
		var headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		};
		if (formValid(this.state)) {
			const data = new FormData();
			for (var x = 0; x < this.state.selectedFile.length; x++) {
				data.append("file", this.state.selectedFile[x]);
			}

			data.append("category", this.state.category);
			data.append("name", this.state.foodName);
			data.append("price", this.state.price);
			data.append("description", this.state.description);
			data.append("duration", this.state.duration);
			data.append("serving", this.state.serving);
			data.append("restaurantname", this.state.rname);

			console.log(data);
			Axios.post(url, data, { headers: headers })
				.then((res) => {
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
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
			<div id="wrapper">
				<Sidebar />
				<div id="content-wrapper">
					<div className="wrapper">
						<div className="form-wrapper">
							<h1>Add Product Details</h1>
							<form onSubmit={this.handleSubmit} noValidate>
								<div className="description">
									<label htmlFor="description">
										Pick restaurant*
									</label>
									<select
										className="form-control"
										value={this.state.rname}
										onChange={this.restaurantChange}
									>
										<option value="Select Restaurant">
											Select Restaurant*
										</option>
										{restaurantnames}
									</select>
								</div>
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
									<label htmlFor="foodName">Food Name*</label>
									<input
										className={
											formErrors.foodName.length > 0
												? "error"
												: null
										}
										placeholder="Food Name"
										type="text"
										name="foodName"
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
									<label htmlFor="price">Price*</label>
									<input
										className={
											formErrors.price.length > 0
												? "error"
												: null
										}
										placeholder="Price"
										type="text"
										name="price"
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
												formErrors.description.length >
												0
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

									<div className="container">
										<div className="row">
											<div className="col-md-6">
												<div className="form-group files">
													<label>
														Upload Your File{" "}
													</label>
													<input
														type="file"
														name="file"
														multiple
														onChange={
															this.onChangeHandler
														}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="login">
									<button type="submit">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default productdetails;
