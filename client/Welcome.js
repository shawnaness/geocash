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
		axios.post("/getAccessToken", { public_token: public_token }, {
			headers: {
		          'content-type': 'application/json',
		     },
		})
			.then(res => {
				this.props.storeAccessToken(res.data.access_token);
				this.props.history.push('/map');
			})
	}


	render() {
		return (
        	<div className="jumbotron">
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