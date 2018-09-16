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
		axios.post("/getAccessToken", { public_token: public_token }, {
			headers: {
		    	'content-type': 'application/json',
			},
		}).then(res => {
			this.props.storeAccessToken(res.data.access_token);
			this.props.history.push('/map');
		})
	}


	render() {
		const style = {
			fontFamily: '\'Montserrat\', sans-serif',
			fontSize: '15pt',
			margin: '20px',
			padding: '10px',
			outline: 'none',
			background: 'white',
			border: '2px solid rgb(241, 241, 241)',
			borderRadius: '20px',
			boxShadow: '0 7px 7px 0 rgba(0,0,0,0.24), 0 7px 7px 0 rgba(0,0,0,0.19)',
		};

		return (
        	<div className="jumbotron">
              	<h1 className="jumbotron-text">GeoCash</h1>
              	<p className="paragraph">Helping you track your money and spending across the globe.</p>
				<PlaidLink
					style={style}
					className={"plaid-button"}
					clientName={"GeoCash"}
					env={NODE_ENV}
					onSuccess={this.onSuccess}
					publicKey={PUBLIC_KEY}
					product={['auth', 'transactions']}
			  	>
				  see your map
				</PlaidLink>
				<img src="/globe.gif" className="globe" height="100px" width="100px" />
			</div>
		);
	}
}