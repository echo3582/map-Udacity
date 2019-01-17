import React from 'react';

const FilterItem = (props) => {
	/**
	* @param {array} initLocations - 初始地点数据
	* @param {array} locations - 列表正在显示的地点数据
	* @param {function} onHandlePick - 地图仅显示被点击地点的标记
	*/
	const { initLocations, onHandlePick, locations } = props;

	/**
	* @description 筛选出用户点击的地点数据，并使地图仅显示该地点的标记
	* @param {string} value - 被点击的地点
	* @param {array} filteredLocations - 被筛选出的地点数据
	*/
	function pickOneLocation (value) {
		let filteredLocations = initLocations.filter((location) => (
			location.marker.title === value));
		let location = filteredLocations[0] ? filteredLocations : initLocations;
		onHandlePick(location);
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