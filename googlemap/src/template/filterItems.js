import React, { Component } from 'react';

class FilterItem extends Component {

	constructor (props) {
		super(props);
	}

	render() {
		const { locations } = this.props
		return (	
			<ul>
				{locations.map((location) => (
					<li key={location.id} className="filterItem">
						<button className="buttonItem">{location.marker.title}</button>
			  		</li>
				))}
			</ul>
		)
	}
}

export default FilterItem;