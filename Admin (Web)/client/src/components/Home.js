import React, { Component } from "react";
import Map from "./Map";

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ marginLeft: "80px" }}>
				<Map
					google={this.props.google}
					center={{ lat: 18.5204, lng: 73.8567 }}
					details={{
						description: this.props.location.state.description,
						name: this.props.location.state.name,
						contactNumber: this.props.location.state.contactNumber,
						estimatedDeliveryTime: this.props.location.state
							.estimatedDeliveryTime,
						email: this.props.location.state.email,
						file: this.props.location.state.file,
					}}
					height="300px"
					zoom={15}
				/>
			</div>
		);
	}
}

export default Home;
