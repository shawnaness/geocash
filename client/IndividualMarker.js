import React from 'react';

import { 
	Marker,
	InfoWindow,
} from 'react-google-maps';

export default class IndividualMarker extends React.Component {
	render() {
		const {
			selectedMarker,
			transaction,
		} = this.props;

		return (
			<Marker 
	    		position={this.props.getLocation(transaction.name)}
	    		//setting pop-up of info window when map clicked
	    		onClick={() => this.props.toggleInfoWindow(transaction.transaction_id)}
	  		>
	  		{selectedMarker == transaction.transaction_id && 
	  			<InfoWindow
	     			onCloseClick={() => this.props.toggleInfoWindow(null)}
				> 
				<div>
					<h2>{transaction.name}</h2>
					<p>${transaction.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
					<p>{transaction.date}</p>
				</div>
				</InfoWindow>
			}
	  		</Marker>
  		);
	}
}