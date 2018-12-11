import React, { Component } from 'react';
import FilterItem from './filterItems';
import FilterInput from './filterInput';

const Filter = (props) => {
	const { locations } = props
	return (
		<div className="filter">
	      	<h2>Filter Tool</h2>
	      	<FilterInput/>
	        <FilterItem locations={locations}/>
      	</div>
	)
}

export default Filter;