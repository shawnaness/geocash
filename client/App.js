import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from './Welcome';
import MoneyMap from './MoneyMap';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accessToken: null,
		};

		this.storeAccessToken = this.storeAccessToken.bind(this);
	}

	storeAccessToken(token) {
		this.setState({accessToken: token});
		console.log(token);
	}

	render() {
		return (
			<main>
				<Switch>
				<Route exact path='/' render={props => <Welcome storeAccessToken={this.storeAccessToken} {...props} />}/>
				<Route path='/map' render={props => <MoneyMap accessToken={this.state.accessToken} {...props} />}/>
				</Switch>
			</main>
		);
	}
}
