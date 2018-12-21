import React, { Component } from 'react'
//google maps 加载
function loadJS(src, err) {
  let ref = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = src
  script.async = true
  script.defer = true
  script.onerror = "err"
  ref.parentNode.insertBefore(script, ref)
}

function errorHandler() {
  console.log("Oops, the map can't be loaded!");//为什么一开始的时候会调用onerror方法呢 不明白...
}

class Map extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap", errorHandler())
  }

  render () {  
    let map, marker, infowindow
    const { mapLocations } = this.props
    const { loaded } = this.state
    window.initMap = () => {
      this.setState({ 
        loaded: true
      })
    }
    console.log(mapLocations+"map")
    loaded ? window.renderMap(mapLocations) : console.log('loading')
    window.renderMap = (locations) => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: locations[0].marker.position,
        zoom: 11
      })
      locations.map((location) => (
        fetch(`https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=${location.marker.title}&utf8=1"`)
          .then(res => res.json())
          .then(infos => infos[3][0])
          .then(url => (
            marker = new window.google.maps.Marker({
              position: location.marker.position,
              title: location.marker.title,
              map: map,
              animation: window.google.maps.Animation.DROP
            }),

            infowindow = new window.google.maps.InfoWindow({
              content: `${location.info}</br><a href=${url} target="_blank">维基百科</a>`,
              maxWidth: 200
            }),

            function (m, i) {
              return m.addListener('click', function () {
                i.open(map, m)
                m.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(function () {
                  m.setAnimation(null)
                }, 1000)
                map.panTo(m.position)
               })
            }(marker, infowindow)
          ))
        ))
      }  
    
    return (
      <div id="map"></div> 
    )
  }
}

export default Map;