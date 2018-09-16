import React from 'react';
import { 
	withScriptjs, 
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';

import { MAPS_API_KEY } from '../constants.js';

const icon = {
    path: google.maps.SymbolPath.CIRCLE,
	fillColor: 'red',
	fillOpacity: .2,
	strokeColor: 'white',
	strokeWeight: .5
  };

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
  	defaultZoom={8}
   	defaultCenter={{ lat: 42.3601, lng: -71.0942 }}
  >
    <Marker
    	icon={icon}
     	position={{ lat: 42.3601, lng: -71.0942 }}
    />
  </GoogleMap>
));


export default class MoneyMap extends React.Component {
	render() {
		return (
			<MapWithAMarker
				googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + MAPS_API_KEY}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}	
}