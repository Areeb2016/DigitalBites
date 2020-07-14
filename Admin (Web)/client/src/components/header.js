import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};

		this.handleClickLogout = this.handleClickLogout.bind(this);
	}

	renderRedirect = () => {
		if (this.state.redirect) {

			setTimeout(() => {
				if (this.state.redirect) {
					window.location.href = "/"
				}
			}, 2000)
		}
	};
	handleClickLogout() {
		localStorage.removeItem("token");
		localStorage.setItem("isLoggedIn", false);
		this.setState({ redirect: true });
	}
	render() {
		return (
			<div>
				<nav className="main-header navbar navbar-expand navbar-white navbar-light">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a
								className="nav-link"
								data-widget="pushmenu"
								href="dummy_url"
								role="button"
							>
								<i className="fas fa-bars" />
							</a>
						</li>
					</ul>

					<ul className="navbar-nav ml-auto ml-md-12">
						<li className="nav-item dropdown no-arrow">
							<Link
								to={"#"}
								className="nav-link dropdown-toggle"
								id="userDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<i className="fas fa-user-circle fa-fw"></i>
							</Link>
							<div
								className="dropdown-menu dropdown-menu-right"
								aria-labelledby="userDropdown"
							>
								<Link to={"#"} className="dropdown-item">
									Settings
								</Link>

								<div className="dropdown-divider"></div>
								{this.renderRedirect()}
								<Link
									to={"#"}
									onClick={this.handleClickLogout}
									className="dropdown-item"
									data-toggle="modal"
									data-target="#logoutModal"
								>
									Logout
								</Link>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}
