let map;
let markers = [];
let locations = [
	{	
		marker: {
			position: {lat:39.908967, lng:116.397491}, 
	 	 	map: map, 
	 		title: '天安门'},
	 	info: "天安门坐落在中国北京市中心，故宫的南端，与天安门广场隔长安街相望，是明清两代北京皇城的正门。" 
	 },
	 {
		marker: {
			position: {lat:39.882435, lng:116.406595}, 
	 	 	map: map, 
	 		title: '天坛'},
	 	info: "天坛公园位于北京市南部，东城区永定门内大街东侧，占地约270万平方米。" 
	 },
	 {
		marker: {
			position: {lat:39.925099, lng:116.396715}, 
	 	 	map: map, 
	 		title: '景山'},
	 	info: "景山公园位于故宫北面，为元、明、清3代的御苑，是一座环境优美的皇家园林。" 
	 },
	 {
		marker: {
			position: {lat:40.000711, lng:116.275486}, 
	 	 	map: map, 
	 		title: '颐和园'},
	 	info: "颐和园是中国现存规模最大、保存最完整的皇家园林，中国四大名园之一。" 
	 },
	 {
		marker: {
			position: {lat:40.008353, lng:116.298193}, 
	 	 	map: map, 
	 		title: '圆明园'},
	 	info: "圆明园又称圆明三园，是清代一座大型皇家宫苑，由圆明园、长春园和万春园组成，所以也叫圆明三园。" 
	 },
	 {
		marker: {
			position: {lat:39.925694, lng:116.389253}, 
	 	 	map: map, 
	 		title: '北海公园'},
	 	info: "北海公园位于北京市中心区，城内景山西侧，在故宫的西北面，与中海、南海合称三海。" 
	 },
	 {
		marker: {
			position: {lat:39.953163, lng:116.416008}, 
	 	 	map: map, 
	 		title: '地坛'},
	 	info: "地坛公园又称方泽坛，是古都北京五坛中的第二大坛。" 
	 }
];

function initMap() {
	let viewModel = new ViewModel();
	ko.applyBindings(viewModel);
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.910853, lng: 116.408213},
		zoom:13
	});
	locations.map(location =>viewModel.addMarker(location.marker));	
	viewModel.addInfoWindow();
}

function errorHandler() {
	alert("Oops, the map can't be loaded!");
}

let ViewModel = function() {
	let self = this;
	this.setMapOnAll = function(map) {
		markers.map(marker => marker.setMap(map));
	}
	this.clearMarkers = function() {
		self.setMapOnAll(null);
	}
	this.showMarkers = function() {
		self.setMapOnAll(map);
	}
	this.deleteMarkers = function() {
		self.clearMarkers();
		markers = [];
	}
	this.addMarker = function(location) {
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
	this.addInfoWindow = function() {
		markers.map(function(marker, index, markers) {
			let currentMarkerInfo = locations.filter(location => location.marker.title === marker.title);			
			let infoWindow = new google.maps.InfoWindow({content: currentMarkerInfo[0].info});
			let infoMarker;
			marker.addListener('click', function() {
				//如果infoWindow已经打开则不再次打开
				if (infoMarker !== 1) {
					infoMarker = 1;
					infoWindow.open(map, marker);
					marker.setAnimation(google.maps.Animation.BOUNCE);
					setTimeout(function() {
						marker.setAnimation(null);					
					},1000)
				}
			});
		});	
	}
	this.clickedLocation = function(location) {
		self.deleteMarkers();
		map = new google.maps.Map(document.getElementById('map'), {
			center: location.marker.position,
			zoom:13
		});
		self.addMarker(location.marker);
		self.addInfoWindow();
	}
	this.locationList = ko.observableArray([]);
	this.filterText = ko.observable("");
	self.locationList = ko.computed(function() {
		let filteredLocations;
		if (this.filterText() === "") {
			filteredLocations = locations;
		} else {
			filteredLocations = locations.filter((location) => {
				return	location.marker.title.indexOf(this.filterText()) !== -1;
			});
		}		
		self.deleteMarkers();
		console.log(filteredLocations);
		filteredLocations.map(location => {
			self.addMarker(location.marker);
			self.addInfoWindow();
		});
		return filteredLocations;
	}, this);
};

