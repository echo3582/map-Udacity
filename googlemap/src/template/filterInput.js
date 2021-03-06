import React, { Component } from 'react';
import { Input } from 'antd';

class FilterInput extends Component {

	constructor (props) {
		super(props);
		this.state = {
			/** query - 用户输入 */
			query: ''
		};
	}

	/**
	* @description 筛选出与用户输入匹配的地点项们
	*/
	handleChange = (query) => {
		this.setState({ query: query });
		/** initLocations - 初始地点数据 */
		const { initLocations, onHandleChange } = this.props;
		/** filteredLocations - 被筛选出的地点数据 */
		let filteredLocations = initLocations.filter((location) => (
			location.marker.title.indexOf(query) !== -1));
		/** onHandleChange - 更新列表和地图显示 */
		onHandleChange(filteredLocations);
	};

	render () {
		const { query } = this.state;
		return (
		  <Input
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