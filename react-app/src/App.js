import React from "react";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import ShareSecret from "./ShareSecret";
import RecoverSecret from "./RecoverSecret";

export default class App extends React.Component {
	state = {
		users: [],
	};


	render() {

		return (
			<div className="shamir_holder">
				<ShareSecret></ShareSecret>
				<RecoverSecret></RecoverSecret>
			</div>
		);
	}
}
