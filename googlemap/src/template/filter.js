import React from 'react';
import FilterItem from './filterItems';
import FilterInput from './filterInput';

const Filter = (props) => {
	const { initLocations, locations, onHandleChange, onHandlePick } = props;
	return (
		<div className="filter">
	      	<h2>Filter Tool</h2>
	      	<FilterInput
	      		initLocations={initLocations}
	      		locations={locations}
	      		onHandleChange={onHandleChange}
	      	/>
	        <FilterItem
	        	initLocations={initLocations}
	        	locations={locations}
	        	onHandlePick={onHandlePick}
	        />
      	</div>
	)
}

export default Filter;