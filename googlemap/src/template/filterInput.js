import React, { Component } from 'react';

class FilterInput extends Component {
	/**
	* @param {string} query - 用户输入
	*/
	constructor (props) {
		super(props);
		this.state = {
			query: ''
		};
	}

	/**
	* @description 筛选出与用户输入匹配的地点项们
	* @param {array} initLocations - 初始地点数据
	* @param {array} filteredLocations - 被筛选出的地点数据
	* @param {array} newLocations - 应显示地点数据
	* @param {function} onHandleChange - 更新列表和地图显示
	*/
	handleChange = (query) => {
		this.setState({ query: query });
		const { initLocations, onHandleChange } = this.props;
		let filteredLocations = initLocations.filter((location) => (
			location.marker.title.indexOf(query) !== -1));
		let newLocations = filteredLocations[0] ? filteredLocations : initLocations;
		onHandleChange(newLocations);
	};

	render () {
		const { query } = this.state;
		return (
		  <input
		  	autoFocus
		  	type="text"
		  	placeholder="Filter"
		  	value={query}
		  	onChange={(event) => this.handleChange(event.target.value)}
		  />
		)
	}
}

export default FilterInput;