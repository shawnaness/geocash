import React from 'react';

import { 
	Marker,
	InfoWindow,
} from 'react-google-maps';

export default class IndividualMarker extends React.Component {
	render() {
		const {
			transaction
		} = this.props;

		return (
			<Marker 
	    		position={this.props.getLocation(transaction.name)}
	    		//setting pop-up of info window when map clicked
	    		onClick={() => this.props.toggleInfoWindow(transaction.transaction_id)}
	  		>
	  		<InfoWindow
	     		onCloseClick={() => this.props.toggleInfoWindow(null)}
			> 
			<div>
				{ transaction.name }
			</div>
			</InfoWindow>
	  		</Marker>
  		);
	}
}