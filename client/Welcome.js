import React from 'react';
import PlaidLink from 'react-plaid-link';

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
		console.log('yay!');
	}


	render() {
		return (
			<div>
				<h1>Welcome to GeoCash</h1>
				<PlaidLink
				  clientName={"GeoCash"}
				  env={NODE_ENV}
				  onSuccess={this.onSuccess}
				  publicKey={PUBLIC_KEY}
				  product={['auth', 'transactions']}
			  	>
				  Link Account
				</PlaidLink>
			</div>
		);
	}
}