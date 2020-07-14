import React, { Component } from "react";
import Axios from "axios";
import { Spin } from 'shineout'
export default class restaurantDetails extends Component {
	constructor(props) {
		super(props);
		this.url = "https://digitalbites.herokuapp.com/restaurant/R";
		this.token = localStorage.getItem("token");

		this.state = {
			foodName: null,
			price: null,
			description: " ",
			foodType: "",
			isloading: true,
			restaurants: [],
			Categories: [],
			duration: " ",
			serving: " ",
			rname: "none ",
			category: " ",
			createdAt: "",
			Image: " ",
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
		Axios.get(
			"https://digitalbites.herokuapp.com/food/" +
				this.props.match.params.id
		) //check the localhost link
			.then((response) => {
				console.log(response);
				this.setState({
					isloading: false,
					serving: response.data.Serving,

					duration: response.data.Duration,
					createdAt: response.data.createdAt,
					Image: response.data.image,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		const { duration, createdAt, serving, Image } = this.state;
		return (
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1> Product Details</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/dashboard">Home</a>
									</li>
									<li className="breadcrumb-item">
										<a href="/viewMenus">
											View Menus
										</a>
									</li>
									<li className="breadcrumb-item active">
										Product Details
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
											<i className="fas fa-utensils" />
											Product Details
										</h3>
									</div>
									{/* /.card-header */}
									<div className="card-body">
										<dl>
											<dt>Duration</dt>
											<dd>{duration}</dd>
											<dt>Created At</dt>
											<dd>{createdAt}</dd>
											<dt>Serving</dt>
											<dd>{serving}</dd>
											<dt>Image</dt>
											<dd>
												<div class="filter-container p-0 row">
													<div
														class="filtr-item col-sm-2"
														data-category="1"
														data-sort="white sample"
													>
														<img
															src={Image}
															class="img-fluid mb-2"
															alt="white sample"
														/>
													</div>
												</div>
											</dd>
										</dl>
									</div>
									{/* /.card-body */}
								</div>
								{/* /.card */}
							</div>
						</div>
					</div>
					{this.usespinner()}
				</section>
			</div>
		);
	}
}
