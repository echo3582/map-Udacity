import React, { Component } from 'react'
//google maps 加载
function loadJS(src) {
  let ref = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = src
  script.async = true
  script.defer = true
  ref.parentNode.insertBefore(script, ref)
}

class Map extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap")
  }

  render () {  
    let map, marker, infowindow, infoUrl
    const { locations } = this.props
    window.initMap = () => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: locations[0] ? locations[3].marker.position : {"lat": 39.908967,"lng": 116.397491},
        zoom: 10
      })

      locations.map((location) => (

        fetch(`https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=${location.marker.title}&utf8=1"`)
          .then(res => res.json())
          .then(infos => infos[3][0])
          .then(url => (
            infowindow = new window.google.maps.InfoWindow({
              content: `${location.info}</br><a href=${url} target="_blank">维基百科</a>`,
              maxWidth: 200
            }),

            marker = new window.google.maps.Marker({
              position: location.marker.position,
              title: location.marker.title,
              map: map
            }),

            function (m, i) {
              return m.addListener('click', function () {
                i.open(map, m)
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