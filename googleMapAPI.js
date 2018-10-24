let map;
let markers = [];
let globleInfo;
let locations = [{
		marker: {
			position: {
				lat: 39.908967,
				lng: 116.397491
			},
			map: map,
			title: '天安门'
		},
		info: "天安门坐落在中国北京市中心，故宫的南端，与天安门广场隔长安街相望，是明清两代北京皇城的正门。",
		infoUrl: ""
	},
	{
		marker: {
			position: {
				lat: 39.882435,
				lng: 116.406595
			},
			map: map,
			title: '天坛'
		},
		info: "天坛公园位于北京市南部，东城区永定门内大街东侧，占地约270万平方米。",
		infoUrl: ""
	},
	{
		marker: {
			position: {
				lat: 39.925099,
				lng: 116.396715
			},
			map: map,
			title: '景山公园'
		},
		info: "景山公园位于故宫北面，为元、明、清3代的御苑，是一座环境优美的皇家园林。",
		infoUrl: ""
	},
	{
		marker: {
			position: {
				lat: 40.000711,
				lng: 116.275486
			},
			map: map,
			title: '颐和园'
		},
		info: "颐和园是中国现存规模最大、保存最完整的皇家园林，中国四大名园之一。",
		infoUrl: ""
	},
	{
		marker: {
			position: {
				lat: 40.008353,
				lng: 116.298193
			},
			map: map,
			title: '圆明园'
		},
		info: "圆明园又称圆明三园，是清代一座大型皇家宫苑，由圆明园、长春园和万春园组成，所以也叫圆明三园。",
		infoUrl: ""
	},
	{
		marker: {
			position: {
				lat: 39.925694,
				lng: 116.389253
			},
			map: map,
			title: '北海公园'
		},
		info: "北海公园位于北京市中心区，城内景山西侧，在故宫的西北面，与中海、南海合称三海。",
		infoUrl: ""
	},
	{
		marker: {
			position: {
				lat: 39.953163,
				lng: 116.416008
			},
			map: map,
			title: '地坛'
		},
		info: "地坛公园又称方泽坛，是古都北京五坛中的第二大坛。",
		infoUrl: ""
	}
];

function initMap() {
	let viewModel = new ViewModel();
	ko.applyBindings(viewModel);
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 39.910853,
			lng: 116.408213
		},
		zoom: 11
	});
	locations.map(location => viewModel.addMarker(location.marker));
	locations.map(location => viewModel.fetchInfo(location.marker));
}

function errorHandler() {
	alert("Oops, the map can't be loaded!");
}

let ViewModel = function () {
	let self = this;
	this.setMapOnAll = function (map) {
		markers.map(marker => marker.setMap(map));
	}
	this.clearMarkers = function () {
		self.setMapOnAll(null);
	}
	this.showMarkers = function () {
		self.setMapOnAll(map);
	}
	this.deleteMarkers = function () {
		self.clearMarkers();
		markers = [];
	}
	this.fetchInfo = function (marker) {
		fetch(`https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=${marker.title}&utf8=1"`)
			.then(res => res.json())
			.then(infos => infos[3][0])
			.then(url => {
				//把获取的url分别添加到locations数组每个元素的infoUrl属性中
				let currentlocation = locations.filter(location => location.marker.title === marker.title);
				let i = locations.indexOf(currentlocation[0])
				locations[i].infoUrl = url;
			})
			.then(self.addInfoWindow)
			.catch(self.errorCatch)
	}
	this.errorCatch = function (e) {
		alert(`Oops, something goes Wrong!`);
	}
	this.addMarker = function (location) {
		let position = location.position;
		let title = location.title;
		let marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			animation: google.maps.Animation.DROP
		});
		markers.push(marker);
	}
	this.addInfoWindow = function () {
		markers.map(function (marker, index, markers) {
			let currentMarkerInfo = locations.filter(location => location.marker.title === marker.title);
			let infoWindow = new google.maps.InfoWindow({
				content: `${currentMarkerInfo[0].info}</br><a href=${currentMarkerInfo[0].infoUrl} target="_blank">维基百科</a>`,
				maxWidth: 200
			});
			let infoMarker;
			marker.addListener('click', function () {
				if (globleInfo) {	
					globleInfo.close();
				} 
				infoWindow.open(map, marker);
				globleInfo = infoWindow;
				marker.setAnimation(google.maps.Animation.BOUNCE);
				setTimeout(function () {
					marker.setAnimation(null);
				}, 1000)
				map.panTo(marker.position);
			});
		});
	}
	this.clickedLocation = function (location) {
		self.deleteMarkers();
		map.panTo(location.marker.position);
		self.addMarker(location.marker);
		self.fetchInfo(location.marker);
	}
	this.count = ko.observable(0);
	this.showList = function () {
		return this.count(this.count()+1);
	};
	self.collapse = ko.pureComputed(function () {
		return this.count()%2 !== 0 ? "collapse" : ""
	}, this);
	this.locationList = ko.observableArray([]);
	this.filterText = ko.observable("");
	self.locationList = ko.computed(function () {
		let filteredLocations;
		if (this.filterText() === "") {
			filteredLocations = locations;
		} else {
			filteredLocations = locations.filter((location) => {
				return location.marker.title.indexOf(this.filterText()) !== -1;
			});
		}
		self.deleteMarkers();
		filteredLocations.map(location => {
			self.addMarker(location.marker);
			self.fetchInfo(location.marker);
		});
		return filteredLocations;
	}, this);
};