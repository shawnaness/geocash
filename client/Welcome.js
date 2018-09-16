import React from 'react';
import PlaidLink from 'react-plaid-link';
import axios from 'axios';

import {
	NODE_ENV,
	PUBLIC_KEY,
} from '../constants.js';

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);

		this.onSuccess = this.onSuccess.bind(this);
	}

	onSuccess(public_token, metadata) {
		// pass token to server
		console.log(public_token);
		axios.post("/get_transactions", { public_token: public_token })
			.then(res => {
				console.log(res);
			})
	}


	render() {
		return (
			<div>
				<img className="jumbotron-image" src="/map.jpg" />
				<h1 className="jumbotron-text">GeoCash</h1>
				<PlaidLink
				  clientName={"GeoCash"}
				  env={NODE_ENV}
				  onSuccess={this.onSuccess}
				  publicKey={PUBLIC_KEY}
				  product={['auth', 'transactions']}
			  	>
				  SEE YOUR MAP
				</PlaidLink>
			</div>
		);
	}
}