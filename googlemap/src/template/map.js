import React, { Component } from 'react';
let map, marker, infoWindow, globalInfo;
class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  /**
  * @description 加载Google maps
  * @param {string} src - Google maps脚本地址
  * @param {function} error - 错误处理函数
  */
  loadJS(src, error) {
    let ref = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onerror = error();
    ref.parentNode.insertBefore(script, ref);
  }

  errorHandler() {
    document.getElementById('map').insertAdjacentHTML('afterbegin', `Oops, the map can't be loaded!`)
    console.log("Oops, the map can't be loaded!");
  }

  componentDidMount() {
    this.loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap", this.errorHandler);
  }

  /**
  * @description 添加地图
  * @param {array} locations - 地点们
  */
  static addMap(locations) {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: locations[0].marker.position,
      zoom: 11
    });
    return map;
  }

  /**
  * @description 为地图添加地点标记
  * @param {object} location - 地点信息
  */
  static addMarker(location) {
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
  static addInfo(location, url) {
    infoWindow= new window.google.maps.InfoWindow({
      content: `${location.info}</br><a href=${url} target="_blank">维基百科</a>`,
      maxWidth: 200
    });
    return infoWindow;
  }

  /**
  * @description 为信息窗口添加点击监听事件
  */
  clickListener(mar, info) {
    return mar.addListener('click', function () {
      if (globalInfo) {
        globalInfo.close();
      }
      /** 打开该标记的信息窗口 */
      info.open(map, mar);
      globalInfo = info;
      /** 点击标记时标记上下跳动 */
      mar.setAnimation(window.google.maps.Animation.BOUNCE);
      /** 1s后停止动画 */
      setTimeout(function () {
        mar.setAnimation(null)
      }, 1000);
      /** 平滑移动中心点 */
      map.panTo(mar.position);
    })
  }

  /**
  * @description 渲染地图
  */
  renderMap(locations) {
    /** 添加地图 */
    Map.addMap(locations);
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
          this.clickListener(marker, infoWindow);
        })
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
    const { mapLocations } = this.props;
    const { loaded } = this.state;
    window.initMap = this.initMap.bind(this);
    if (loaded) {
      this.renderMap(mapLocations);
    }
  }
  render() {
    return (
      <div id = "map"> </div>
    )
  }
}

export default Map;