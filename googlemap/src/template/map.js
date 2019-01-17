import React, { Component } from 'react';
/**
* @description 加载Google maps
* @param {string} src - Google maps脚本地址
*/
function loadJS(src, err) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onerror = err();
  ref.parentNode.insertBefore(script, ref);
}

function errorHandler() {
  document.getElementById('map').insertAdjacentHTML('afterbegin', `kdjflkajsdl`)
  console.log("Oops, the map can't be loaded!");
}

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    // loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap", errorHandler);
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWPuZ2prAUQdeE&libraries=places&callback=initMap", errorHandler);
  }

  render() {
    let map, marker, infowindow;
    const { mapLocations } = this.props;
    const { loaded } = this.state;
    window.initMap = () => {
      this.setState({
        loaded: true
      });
    };

    loaded ? window.renderMap(mapLocations) : console.log('loading');

    function addMarker(location) {
      marker = new window.google.maps.Marker({
        position: location.marker.position,
        title: location.marker.title,
        map: map,
        animation: window.google.maps.Animation.DROP
      });
      return marker;
    }

    function addInfo(location, url) {
      infowindow = new window.google.maps.InfoWindow({
        content: `${location.info}</br><a href=${url} target="_blank">维基百科</a>`,
        maxWidth: 200
      });
      return infowindow;
    }

    function clickListener(mar, info) {
      return mar.addListener('click', function () {
        info.open(map, mar);
        mar.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function () {
          mar.setAnimation(null)
        }, 1000);
        map.panTo(mar.position);
      })
    }

    window.renderMap = (locations) => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: locations[0].marker.position,
        zoom: 11
      });
      locations.map((location) => {
        fetch(`https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=${location.marker.title}&utf8=1"`)
          .then(res => res.json())
          .then(infos => infos[3][0])
          .then((url) => (
            addMarker(location),
            addInfo(location, url),
            clickListener(marker, infowindow)
          ))
      });
    };

    return (
      <div id = "map"> </div>
    )
  }
}

export default Map;