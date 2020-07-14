import React, { Component } from "react";
import Header from "./components/header";
import Menu from "./components/menu";
import Footer from "./components/footer";
import Routes from "./components/routes";
import { withRouter } from "react-router-dom";
import './App.css';
export default class App extends Component {
	constructor(props) {
		super(props);

		this.token = localStorage.getItem("token");
	}

	render() {
		return (
			<div>
				{this.token && <Header />}
				{this.token && <Menu />}

				<Routes />
				{this.token && <Footer />}
			</div>
		);
	}
}

// const App = ({ location }) => {
// 	return (
// 	  <div>

// 		<Routes />
// 	  </div>

// 	);

//   }

//   export default withRouter(App);
