import React, { Component } from 'react';

class Map extends Component {

  static map;
  static marker;
  static infoWindow;
  static globalInfo;
  static markers = [];

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  /**
  * @description 加载Google maps
  * @param {string} src - Google maps脚本地址
  * @param {function} error - 错误处理函数
  */
  static loadJS(src, error) {
    let ref = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onerror = error;
    ref.parentNode.insertBefore(script, ref);
  }

  static errorHandler() {
    document.getElementById('map').insertAdjacentHTML('afterbegin', `Oops, the map can't be loaded! Maybe you need a tool to visit google ~`)
  }

  componentDidMount() {
    Map.loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap", Map.errorHandler);
  }

  /**
  * @description 添加地图
  * @param {array} locations - 地点们
  */
  static addMap(locations) {
    Map.map = new window.google.maps.Map(document.getElementById('map'), {
      center: locations[0].marker.position,
      zoom: 11
    });
    return Map.map;
  }

  /**
  * @description 为地图添加地点标记
  * @param {object} location - 地点信息
  */
  static addMarker(location) {
    Map.marker = new window.google.maps.Marker({
      position: location.marker.position,
      title: location.marker.title,
      map: Map.map,
      animation: window.google.maps.Animation.DROP
    });
    Map.markers.push(Map.marker);
    return Map.marker;
  }

  static setMapOnAll(map) {
    Map.markers.map((marker) => {
      marker.setMap(map);
      return null;
    });
  }
  /**
  * @description 清除地图上的所有标记
  */
  static clearMarkers() {
    Map.setMapOnAll(null);
    Map.markers = [];
  }

  /**
  * @description 为地点添加信息窗口和维基百科词条链接
  */
  static addInfo(location, url) {
    Map.infoWindow= new window.google.maps.InfoWindow({
      content: `${location.info}</br><a href=${url} target="_blank">维基百科</a>`,
      maxWidth: 200
    });
    return Map.infoWindow;
  }

  /**
  * @description 为信息窗口添加点击监听事件
  */
  clickListener(marker, infoWindow) {
    return marker.addListener('click', function () {
      if (Map.globalInfo) {
        Map.globalInfo.close();
      }
      /** 打开该标记的信息窗口 */
      infoWindow.open(Map.map, marker);
      Map.globalInfo = infoWindow;
      /** 点击标记时标记上下跳动 */
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      /** 1s后停止动画 */
      setTimeout(function () {
        marker.setAnimation(null)
      }, 1000);
      /** 平滑移动中心点 */
      Map.map.panTo(marker.position);
    })
  }

  /**
  * @description 渲染地图
  */
  renderMap(locations, itemIsClicked) {
    /** 清除地图上的所有标记 */
    Map.clearMarkers();
    /** 为每一个地点添加标记、窗口信息和点击监听事件 */
    locations.map((location) => {
      fetch(`https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=${location.marker.title}&utf8=1"`)
        .then(res => res.json())
        .then(infos => infos[3][0])
        .then((url) => {
          /** 添加标记 */
          Map.addMarker(location);
          /** 添加窗口信息 */
          Map.addInfo(location, url);
          /** 添加点击监听事件 */
          this.clickListener(Map.marker, Map.infoWindow);
          /** 如果发生了列表点击事件，则把地图中心点平滑移动到被点击的地点 */
          if (itemIsClicked) {
            Map.map.panTo(location.marker.position);
          }
        })
      return null;
    });
  };

  initMap() {
    const { mapLocations } = this.props;
    Map.addMap(mapLocations);
    this.setState({
      loaded: true
    });

  }

  componentDidUpdate() {
    const { mapLocations, itemIsClicked } = this.props;
    const { loaded } = this.state;
    window.initMap = this.initMap.bind(this);
    if (loaded) {
      this.renderMap(mapLocations, itemIsClicked);
    }
  }
  render() {
    return (
      <div id = "map"> </div>
    )
  }
}

export default Map;