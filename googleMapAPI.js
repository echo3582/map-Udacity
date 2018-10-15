let map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.910853, lng: 116.408213},
		zoom:13
	});
	let tianAnMenPosition = {lat:39.908967, lng:116.397491};
	let marker = new google.maps.Marker({position: tianAnMenPosition, map: map, title: '天安门'}); 
	let infoWindow = new google.maps.InfoWindow({content: "天安门坐落在中国北京市中心，故宫的南端，与天安门广场隔长安街相望，是明清两代北京皇城的正门。"});
	marker.addListener('click', function() {
		infoWindow.open(map, marker);
	});
}