import React, { Component } from 'react';
import Filter from './template/filter';
import GoogleMap from './template/map';
import * as _ from 'lodash';

class App extends Component {
	/**
	* @param {array} initLocations - 初始地点数据
	* @param {array} locations - 列表正在显示的地点数据
	* @param {array} mapLocations - 地图正在显示marker的地点的数据
	*/
	constructor (props) {
		super(props);
		this.state = {
			initLocations: [],
			locations: [],
			mapLocations: []
		};
	}

	/**
	* @description 同步更新列表和地图标记为筛选后地点，与此同时，该函数具备防抖功能
	* @param {array} newLocations - 筛选后数组
	*/
	updateLocations = _.debounce((newLocations) => {
		this.setState({
			locations: newLocations,
			mapLocations: newLocations
		})
	}, 600);

	/**
	* @description 当用户点击列表中某地点项时，地图仅显示该地点的标记
	* @param {array} location - 被点击的地点项
	*/
	pickLocation (location) {
		this.setState({ mapLocations: location });
		console.log(this.state.mapLocations+"App");
	}

 	render() {
		const { locations, initLocations, mapLocations } = this.state;
	    return (
	      <div className="container">
	      	<div className="row">
				<Filter
					initLocations={initLocations}
					locations={locations}
					onHandleChange={(newLocations) => this.updateLocations(newLocations)}
					onHandlePick={(location) => this.pickLocation(location)}
				/>
	       	 	<GoogleMap
					locations={locations}
					mapLocations={mapLocations}
				/>
			</div>
	      </div>
	    )
  	}

  	/**
	* @description 获取locations.json中的数据并初始化initLocations、locations、mapLocations
	*/
  	componentDidMount () {
  		fetch('http://www.qianqianx.com/map-Udacity/api/locations.json')
    	.then((res) => res.json())
    	.then((info) => {
	 		this.setState({
				initLocations: info.data.locations,
	  			locations: info.data.locations,
	  			mapLocations: info.data.locations
			})
    	})
  	}
}

export default App;