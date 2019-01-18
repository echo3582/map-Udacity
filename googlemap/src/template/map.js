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
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap", errorHandler);
    // loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWPuZ2prAUQdeE&libraries=places&callback=initMap", errorHandler);
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

    /**
    * @description 添加地图
    * @param {array} locations - 地点们
    * @param {object} map - 地图
    * @param {object} locations[0].marker.position - 第一个地点的位置
    */
    function addMap(locations) {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: locations[0].marker.position,
        zoom: 11
      });
      return map;
    }

    /**
    * @description 为地图添加地点标记
    * @param {object} location - 地点信息
    * @param {object} marker - 地点标记
    * @param {object} location.marker.position - 位置信息
    * @param {object} location.marker.title - 位置名称
    */
    function addMarker(location) {
      marker = new window.google.maps.Marker({
        position: location.marker.position,
        title: location.marker.title,
        map: map,
        animation: window.google.maps.Animation.DROP
      });
      return marker;
    }

    /**
    * @description 为地点添加信息窗口和维基百科词条链接
    */
    function addInfo(location, url) {
      infowindow = new window.google.maps.InfoWindow({
        content: `${location.info}</br><a href=${url} target="_blank">维基百科</a>`,
        maxWidth: 200
      });
      return infowindow;
    }

    /**
    * @description 为信息窗口添加点击监听事件
    */
    function clickListener(mar, info) {
      return mar.addListener('click', function () {
        /**
        * @description 打开该标记的信息窗口
        */
        info.open(map, mar);
        /**
        * @description 为标记添加动画效果
        */
        mar.setAnimation(window.google.maps.Animation.BOUNCE);
        /**
        * @description 1s后停止动画
        */
        setTimeout(function () {
          mar.setAnimation(null)
        }, 1000);
        /**
        * @description 平滑移动中心点
        */
        map.panTo(mar.position);
      })
    }

    /**
    * @description 渲染地图
    */
    window.renderMap = (locations) => {
      /**
      * @description 添加地图
      */
      addMap(locations);
      /**
      * @description 为每一个地点添加标记、窗口信息和点击监听事件
      */
      locations.map((location) => {
        fetch(`https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=${location.marker.title}&utf8=1"`)
          .then(res => res.json())
          .then(infos => infos[3][0])
          .then((url) => (
            /**
            * @description 添加标记
            */
            addMarker(location),
            /**
            * @description 添加窗口信息
            */
            addInfo(location, url),
            /**
            * @description 添加点击监听事件
            */
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