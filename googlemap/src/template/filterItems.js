import React from 'react';

const FilterItem = (props) => {	
	const { initLocations, onHandlePick, locations } = props
	function pickOneLocation (value) {
		let filteredLocations = initLocations.filter((location) => (
			location.marker.title === value))
		let location = filteredLocations[0] ? filteredLocations : initLocations
		onHandlePick(location)
	}
	return (	
			<ul>
				{
					locations.map((location) => (
						<li key={location.id} className="filterItem">
							<button 
								className="buttonItem"
								value={location.marker.title}
								onClick={(event) => pickOneLocation(event.target.value)}
							>
								{location.marker.title}
							</button>
				  		</li>
					))
				}
			</ul>
		)
}

export default FilterItem;