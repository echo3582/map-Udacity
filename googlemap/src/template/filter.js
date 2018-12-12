import React, { Component } from 'react';
import FilterItem from './filterItems';
import FilterInput from './filterInput';

const Filter = (props) => {
	const { initLocations, locations, onHandleChange } = props
	return (
		<div className="filter">
	      	<h2>Filter Tool</h2>
	      	<FilterInput 
	      		initLocations={initLocations}
	      		locations={locations}
	      		onHandleChange={onHandleChange}
	      	/>
	        <FilterItem locations={locations}/>
      	</div>
	)
}

export default Filter;