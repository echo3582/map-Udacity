import React from 'react';
import { List } from 'antd';

const FilterItem = (props) => {
	/** initLocations - 初始地点数据 */
	/** locations - 列表正在显示的地点数据 */
	/** onHandlePick - 地图仅显示被点击地点的标记 */
	const { initLocations, onHandlePick, locations } = props;

	/**
	* @description 筛选出用户点击的地点数据，并使地图仅显示该地点的标记
	* @param {string} value - 被点击的地点
	*/
	function pickOneLocation (value) {
		/** filteredLocations - 被筛选出的地点数据 */
		let filteredLocations = initLocations.filter((location) => (
			location.marker.title === value));
		let location = filteredLocations[0] ? filteredLocations : initLocations;
		onHandlePick(location);
	}
	return (
			<ul>
				{
					locations.map((location) => (
						<List key={location.id} className="filterItem">
							<button
								className="buttonItem"
								value={location.marker.title}
								onClick={(event) => pickOneLocation(event.target.value)}
							>
								{location.marker.title}
							</button>
				  	</List>
					))
				}
			</ul>
		)
}

export default FilterItem;