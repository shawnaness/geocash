import React from 'react';
import axios from 'axios';
import { 
	withScriptjs, 
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from 'react-google-maps';
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

import { MAPS_API_KEY } from '../constants.js';
import IndividualMarker from './IndividualMarker';

export default class MoneyMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMarker: null,
		};

		this.getLocation = this.getLocation.bind(this);
		this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
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

	// toggleInfoWindow(loc) {
 //    	// clicking 'x' in the info window will pass null, so if we detect that, reset the position in state
 //    	if (loc == null) {
 //      		this.setState({ windowPosition: null })
 //      		return
 //    	}
 //    	// otherwise get coords of clicked marker and set to state
 //    	let markerLoc = { lat: loc.latLng.lat(), lng: loc.latLng.lng() }
 //    	this.setState({ windowPosition: markerLoc })
 //  	}

 	toggleInfoWindow(id) {
 		this.setState({ selectedMarker: id });
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
				return { lat: 47.2226, lng: -122.4836 };
				break;
			case "Starbucks":
				return { lat: 47.2440, lng: -122.5274 };
				break;
			case "SparkFun":
				return { lat: 42.3571, lng: -71.1143 };
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
		  	defaultZoom={1}
		   	defaultCenter={{ lat: 0, lng: 0 }}
		  >
		  	<MarkerClusterer
				averageCenter
				enableRetinaIcons
				gridSize={60}
			>
			    {this.state.transactions ? this.state.transactions.map(transaction => (
		      		<IndividualMarker 
		      			key={transaction.transaction_id}
		      			transaction={transaction}
		      			getLocation={this.getLocation}
		      			toggleInfoWindow={this.toggleInfoWindow}
		      			selectedMarker={this.state.selectedMarker}
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