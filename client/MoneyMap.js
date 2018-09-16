import React from 'react';
import axios from 'axios';
import { 
	Circle,
	withScriptjs, 
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

import { MAPS_API_KEY } from '../constants.js';


export default class MoneyMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			zoom: 1,
			center: { lat: 0, lng: 0 },
		};

		this.getLocation = this.getLocation.bind(this);
	}

	componentDidMount() {
		console.log(this.props.accessToken);
		axios.post("/getTransactions", {access_token: this.props.accessToken}, {
			headers: {
		    	'content-type': 'application/json',
		    },
		}).then(res => {
			this.setState({transactions: res.data.transactions});
			console.log(res.data.transactions);
		});
	}


	getLocation(name) {
		switch(name) {
			case "United Airlines": 
				return { lat: 41.8789, lng: -87.6354 };
				break;
			case "Uber 072515 SF**POOL**":
				return { lat: 37.7898, lng: -122.3999 };
				break;
			case "Tectra Inc":
				return { lat: 37.4203, lng: -122.1013 };
				break;	
			case "KFC":
				return { lat: 37.7699, lng: -122.4248 };
				break;
			case "Madison Bicycle Shop":
				return { lat: 43.0609, lng: -89.5251 };
				break;
			case "Touchstone Climbing":
				return { lat: 37.8508, lng: -122.2949 };
				break;
			case "Uber 063015 SF**POOL**":
				return { lat: 37.7898, lng: -122.3999 };
				break;
			case "McDonald's":
				return { lat: 47.2226, lng: -122.48365};
				break;
			case "Starbucks":
				return { lat: 47.24405, lng: -122.527490};
				break;
			case "SparkFun":
				return { lat: 42.357180, lng: -71.114310};
				break;
			case "Uber 072515 SF**POOL**":
				return { lat: 37.7898, lng: -122.3999 };
				break;

			default:
				return { lat: 0, lng: 0 };
		}
	}

	render() {
		var counter = 0;
		const MapWithAMarker = withScriptjs(withGoogleMap(props =>
		  <GoogleMap
		  	defaultZoom={this.state.zoom}
		   	defaultCenter={this.state.center}
		  >
		  	<MarkerClusterer
				averageCenter
				enableRetinaIcons
				gridSize={60}
			>
			    {this.state.transactions ? this.state.transactions.map(transaction => (
		      		<Marker
		      			key={transaction.transaction_id}
		        		position={this.getLocation(transaction.name)}
		      		/>
	   			)) : null
				}
			</MarkerClusterer>
		  </GoogleMap>
		));

		return (
			<MapWithAMarker
				googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + MAPS_API_KEY}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100vh` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}	
}